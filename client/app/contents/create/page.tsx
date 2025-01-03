"use client"
import Switch from "@/components/common/Switch";
import Tiptap from "@/components/contents/TipTap"
import { useState } from "react";
import toast from "react-hot-toast";

function Create() {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [loadingTitles, setLoadingTitles] = useState(false);
    const [isPublished, setIsPublished] = useState(false);
    const [loading, setIsLoading] = useState(false);

    const onContentChange = (data:string) => {
        console.log(data);
        setContent(data);
    }

    const generateCaptionAndTitle = async () => {
        try {
            if (!content || content.length <= 50) {
                toast.error("Content should be at least 50 characters long to generate title and caption");
                return;
            }
            setLoadingTitles(true);
            const url = `/api/generate`;
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ inputText: content }),
            };
            const response = await fetch(url, options);
            const data = await response.json();
            setTitle(data.title);
            setCaption(data.caption);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingTitles(false);
        }
    }

    const createContent = async () => {
        try {
            if (!title || !caption || !content) {
                toast.success("Title, Caption and Content are required.");
                return;
            }
            setIsLoading(true);
            const url = `/api/contents`;
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, caption, content, isPublished }),
            };
            const response = await fetch(url, options);
            const data = await response.json();
            toast.success(data.message);
            setTitle("");
            setCaption("");
            setContent("");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
  return (
    <div className="min-h-screen py-12 max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold">Create a new Content</h1>
        <div className="my-6 p-4 shadow bg-white rounded border">
            <div className="text-sm flex justify-end items-center">
                <button className="p-2 rounded bg-primary text-white" onClick={generateCaptionAndTitle} disabled={loadingTitles}>
                    {loadingTitles ? "Generating" : "Auto Generate"} Caption and Title
                </button>
            </div>
            <input type="text" name="title" placeholder="Title" className="w-full border rounded-md p-2 outline-none my-4" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" name="caption" placeholder="Caption" className="w-full border rounded-md p-2 outline-none my-4" value={caption} onChange={(e) => setCaption(e.target.value)} />
            <div className="p-4 shadow bg-white rounded border min-h-40">
                <Tiptap onContentChange={onContentChange}/>
            </div>
            <div className="pt-4">
                <Switch checked={isPublished} onChange={() => setIsPublished(!isPublished)} />
            </div>
            <div className="pt-8">
                <button disabled={loading} onClick={createContent} className="bg-primary rounded text-white p-4"> {loading ? "Creating..." : "Create Now"} </button>
            </div>
        </div>
    </div>
  )
}

export default Create
