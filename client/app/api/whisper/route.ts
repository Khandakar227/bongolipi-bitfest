import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio") as Blob;

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    const file = new File([audioFile], "audio.webm", { type: audioFile.type });

    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
      response_format: "json",
    });

    return NextResponse.json({ text: transcription.text });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
  }
}