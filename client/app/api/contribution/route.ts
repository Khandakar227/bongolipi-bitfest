import Contribution from '@/db/models/Contribution';
import { dbConnect } from '@/db/mongod';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await getAuth(req);
    const { banglish_text, bangla_text } = await req.json();
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


export const GET = async (req: NextRequest) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const contributions = await Contribution.find({ userId });
    return NextResponse.json(contributions);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 },
    );
  }
}