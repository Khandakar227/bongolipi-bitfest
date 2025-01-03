import Contribution from '@/db/models/Contribution';
import { dbConnect } from '@/db/mongod';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { userId, banglish_text, bangla_text } = await req.json();
    await dbConnect();
    const result = await Contribution.create({
      userId,
      bangla_text,
      banglish_text,
      isApproved: false,
    });
    return NextResponse.json(
      {
        success: true,
        data: result, // 'result' includes insertedId, etc.
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message || 'something went wrong',
      },
      { status: 500 },
    );
  }
}
