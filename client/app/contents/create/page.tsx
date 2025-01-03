"use client"
import Tiptap from "@/components/contents/TipTap"
import { useState } from "react";

function Create() {
    const [content, setContent] = useState("");

    const onContentChange = (data:string) => {
        console.log(data)
        setContent(data);
    }

  return (
    <div className="min-h-screen py-12 max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold">Create a new Content</h1>
        <div className="my-6 p-4 shadow bg-white rounded border">
            <div className="text-sm flex justify-end items-center">
                <button className="p-2 rounded bg-primary text-white">Auto Generate Caption and Title</button>
            </div>
            <input type="text" name="title" placeholder="Title" className="w-full border rounded-md p-2 outline-none my-4" />
            <input type="text" name="caption" placeholder="Caption" className="w-full border rounded-md p-2 outline-none my-4" />
            <div className="p-4 shadow bg-white rounded border min-h-40">
                <Tiptap onContentChange={onContentChange}/>
            </div>
            <div className="pt-8">
                <button className="bg-primary rounded text-white p-4"> Create Now </button>
            </div>
        </div>
    </div>
  )
}

export default Create