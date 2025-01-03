import { NextResponse } from "next/server";
import { dbConnect } from "@/db/mongod";
import { User } from "@/db/models/User";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { userId, firstName, lastName, email } = await req.json();

    if (!userId || !firstName || !lastName || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const newUser = new User({ userId, firstName, lastName, email });
    await newUser.save();

    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
