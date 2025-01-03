import Chat from '@/db/models/Chat';
import { dbConnect } from '@/db/mongod';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'SessionId was not provided' },
        { status: 401 },
      );
    }

    await dbConnect();
    const contents = await Chat.find({ sessionId });
    return NextResponse.json(contents);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 },
    );
  }
};
