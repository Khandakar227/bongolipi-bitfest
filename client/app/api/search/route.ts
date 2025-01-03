import { NextResponse } from "next/server";
import { dbConnect } from "@/db/mongod";
import { User } from "@/db/models/User";
import { Content } from "@/db/models/Content";

export async function GET(req: Request) {
  await dbConnect();

  const url = new URL(req.url);
  const query = url.searchParams.get("q");

  if (!query) {
    return NextResponse.json({ users: [], contents: [] });
  }

  try {
    // Search in Users
    const users = await User.find({
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    }).select("firstName lastName email userId");

    // Search in Contents
    const contents = await Content.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { caption: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    }).select("title caption userId");

    return NextResponse.json({ users, contents });
  } catch (error) {
    console.error("Error searching:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
