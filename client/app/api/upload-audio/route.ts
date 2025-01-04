import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import formidable from "formidable";
import { OpenAI } from "openai";

export const POST = async (req: NextRequest) => {
    try {
        const form = new formidable.IncomingForm();

        const openai = new OpenAI({
              apiKey: process.env.OPENAI_API_KEY,
          });
          
        form.parse(req, async (err, fields, files) => {
          if (err) {
            return NextResponse.json(
                { error: 'Something went wrong. Please try again later.' },
                { status: 500 },
                );
          }
      
          const audioPath = files?.audio?.[0].filepath;
          if (!audioPath) {
            return NextResponse.json(
                { error: 'No audio file provided' },
                { status: 400 },
            );
          } 
          try {
            const response = await openai.audio.transcriptions.create({
                file: fs.createReadStream(audioPath),
                model: "whisper-1",
                response_format: "text",
            });
            return NextResponse.json({ response: response });

        } catch (error) {
            console.log(error);
            return NextResponse.json(
                { error: 'Something went wrong. Please try again later.' },
                { status: 500 },
            );
        }
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: 'Something went wrong. Please try again later.' },
            { status: 500 },
        );
    }
}