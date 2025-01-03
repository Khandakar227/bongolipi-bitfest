"use client";
import Spinner from "@/components/common/Spinner";
import { Delete, Download, Edit, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Content = {
  title: string;
  caption: string;
  content: string;
  isPublished: boolean;
};

function Contents() {
  const [contents, setContents] = useState([] as Content[]);
  const [loading, setLoading] = useState(false);

  const fetchContents = async () => {
    try {
      setLoading(true);
      const url = `/api/contents`;
      const response = await fetch(url);
      const data = await response.json();
      setContents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchContents();
  }, []);
  return (
    <div className="min-h-screen py-12 max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-4xl font-bold">Manage your Contents</h1>
        <Link
          href={"/contents/create"}
          className="flex justify-center items-center gap-2 bg-primary p-2 pr-4 rounded text-white"
        >
          <Plus />
          <span>Create</span>
        </Link>
      </div>

      <div className="my-6 p-4 shadow bg-gray-50 rounded border">
        <h1 className="text-4xl font-bold">My Contents</h1>
        {loading ? (
          <Spinner />
        ) : contents.length === 0 ? (
          <p className="text-center p-4">No contents found.</p>
        ) : (
          contents.map((content, index) => (
            <div
              key={index}
              className="p-4 shadow bg-white rounded border my-4"
            >
              <h2 className="text-2xl font-bold">{content.title}</h2>
              <p>{content.caption}</p>
              <div className="flex justify-end items-center gap-4">
                <button
                  className="text-green-400 p-2 rounded"
                >
                  <Download size={20} />
                </button>
                <button className="text-orange-400 p-2 rounded">
                  <Edit size={20} />
                </button>
                <button className="text-red p-2 rounded">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Contents;
