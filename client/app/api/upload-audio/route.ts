import { NextRequest, NextResponse } from "next/server";
import { Groq } from "groq-sdk";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const unlinkAsync = promisify(fs.unlink);
const mkdirAsync = promisify(fs.mkdir);

const groq = new Groq();

export async function POST(req: NextRequest) {
    const tempFilePath = path.join("/tmp", `audio-${Date.now()}.m4a`);
    await mkdirAsync("/tmp", { recursive: true });
    const writeStream = fs.createWriteStream(tempFilePath);
    try {
        // Write the incoming audio stream to the temporary file
        const reader = req.body?.getReader();

        if (!reader) return NextResponse.json({ error: "No audio data provided" }, { status: 400 });

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            writeStream.write(value);
        }
        writeStream.end();

        // Wait for the file to finish writing
        await new Promise((resolve) => writeStream.on("finish", resolve));

        // Send the file to Groq for transcription
        const transcription = await groq.audio.transcriptions.create({
            file: fs.createReadStream(tempFilePath),
            model: "distil-whisper-large-v3-en",
            response_format: "verbose_json",
        });

        // Delete the temporary file after processing
        await unlinkAsync(tempFilePath);

        // Return the transcription result
        return NextResponse.json({ transcription }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        // Attempt to clean up the temp file if it exists
        try {
            if (tempFilePath && fs.existsSync(tempFilePath)) {
                await unlinkAsync(tempFilePath);
            }
        } catch (cleanupError) {
            console.error("Error cleaning up temp file:", cleanupError);
        }

        return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
    }
}
