import Contribution from '@/db/models/Contribution';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing contribution ID' },
        { status: 400 },
      );
    }

    // Directly find and update, returning the updated doc
    const updatedContribution = await Contribution.findByIdAndUpdate(
      id,
      { $set: { isApproved: true } },
      { new: true }, // returns the updated document
    );

    // If not found or already updated, updatedContribution will be null
    if (!updatedContribution) {
      return NextResponse.json(
        { success: false, error: 'No document found or already approved.' },
        { status: 404 },
      );
    }

    // Finally, return a success response
    return NextResponse.json(
      {
        success: true,
        message: 'Contribution approved successfully',
        data: updatedContribution,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          (error as Error).message ||
          'An error occurred while approving the contribution',
      },
      { status: 500 },
    );
  }
}
