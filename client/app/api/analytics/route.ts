import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/db/mongod";
import { Content } from "@/db/models/Content";
import Chat from "@/db/models/Chat";
import Contribution from "@/db/models/Contribution";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { userId } = getAuth(req); // Pass user ID in request headers

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required in the request headers" },
        { status: 400 }
      );
    }

    // Fetch total contents created by the user
    const totalContents = await Content.countDocuments({ userId });

    // Fetch total upvotes across user's contents
    const userContents = await Content.find({ userId });
    const totalUpvotes = userContents.reduce(
      (sum, content) => sum + (content.upvotes?.length || 0),
      0
    );

    // Fetch total chatbot interactions
    const totalChatInteractions = await Chat.countDocuments({ userId });

    // Fetch total contributions by the user
    const totalContributions = await Contribution.countDocuments({ userId });

    return NextResponse.json({
      totalContents,
      totalUpvotes,
      totalChatInteractions,
      totalContributions,
    });
  } catch (error) {
    console.error("Error fetching user analytics:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
