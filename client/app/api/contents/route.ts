import { Content } from "@/db/models/Content";
import { dbConnect } from "@/db/mongod";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";


export const POST = async (req: NextRequest) => {
    try {
        
        const { title, caption, content, isPublished } = await req.json();
        if (!title || !caption || !content) {
            return NextResponse.json({ error: "Title, Caption and Content are required." }, { status: 400 });
        }
        const { userId } = getAuth(req);
        console.log(userId);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        // Save the content to the database
        await dbConnect();
        const newContent = new Content({ title, caption, content, isPublished, userId });
        await newContent.save();
        return NextResponse.json({ message: "Content created successfully." }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
    }
}


export const GET = async (req: NextRequest) => {
    try {
        const { userId } = getAuth(req);
        
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const contents = await Content.find({ userId });
        return NextResponse.json(contents);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
    }
}


export const DELETE = async (req: NextRequest) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { id } = await req.json();
        await dbConnect();
        await Content.findByIdAndDelete(id);
        return NextResponse.json({ message: "Content deleted successfully." });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
    }
}