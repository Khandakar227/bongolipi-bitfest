import { Groq } from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_MIME_TYPES = [
  'audio/flac',
  'audio/mp3',
  'audio/mp4',
  'audio/mpeg',
  'audio/mpga',
  'audio/m4a',
  'audio/ogg',
  'audio/opus',
  'audio/wav',
  'audio/webm',
];

interface TranscriptionResponse {
  success: boolean;
  data?: string;
  error?: string;
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<TranscriptionResponse>> {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile || audioFile.size === 0) {
      return NextResponse.json(
        { success: false, error: 'Empty or invalid audio file' },
        { status: 400 },
      );
    }

    // Get file content and verify
    const arrayBuffer = await audioFile.arrayBuffer();
    if (arrayBuffer.byteLength === 0) {
      return NextResponse.json(
        { success: false, error: 'Audio file is empty' },
        { status: 400 },
      );
    }

    // Create a new file with verified content
    const newFile = new File([arrayBuffer], 'audio.wav', {
      type: audioFile.type || 'audio/wav',
    });

    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY not configured');
    }

    const groqClient = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const transcription = await groqClient.audio.transcriptions.create({
      file: newFile,
      model: 'whisper-1',
    });

    if (!transcription?.text) {
      throw new Error('No transcription received');
    }

    return NextResponse.json({
      success: true,
      data: transcription.text,
    });
  } catch (error) {
    console.error('Transcription error:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to process audio',
      },
      { status: 500 },
    );
  }
}
