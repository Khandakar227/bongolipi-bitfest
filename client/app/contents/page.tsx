"use client";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Spinner from "@/components/common/Spinner";
import { Delete, Download, Edit, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

type Content = {
  _id: string;
  title: string;
  caption: string;
  isPublished: boolean;
}

function Contents() {
  const [contents, setContents] = useState([] as Content[]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      const url = `/api/contents`;
      const response = await fetch(url, { method: "DELETE", body: JSON.stringify({ id }) });
      const data = await response.json();
      setContents(c => c.filter(content => content._id !== id));
    } catch (error) {
      console.error(error);
    }

    setDialogOpen(false);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };


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
  }

  useEffect(() => {
    fetchContents();
  }, []);
  return (
    <div className="min-h-screen py-12 max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-4xl font-bold">Manage your Contents</h1>
        <Link href={"/contents/create"} className="flex justify-center items-center gap-2 bg-primary p-2 pr-4 rounded text-white"><Plus/><span>Create</span></Link>
      </div>

      <div className="my-6 p-4 shadow bg-gray-50 rounded border">
        <h1 className="text-4xl font-bold">My Contents</h1>
          {
            loading ? (<Spinner/>) :
            contents.length === 0 ? (<p className="text-center p-4">No contents found.</p>) :
            contents.map((content, index) => (
              <div key={index} className="p-4 shadow bg-white rounded border my-4">
                <h2 className="text-2xl font-bold">{content.title}</h2>
                <p>{content.caption}</p>
                <p className="p-1 rounded-md border bg-gray-100">{content.isPublished ? "Published" : "Private"}</p>
                <div className="flex justify-end items-center gap-4">
                  <button className="text-green-400 p-2 rounded"><Download size={20}/></button>
                  <button className="text-orange-400 p-2 rounded"><Edit size={20}/></button>
                  <button className="text-red p-2 rounded" onClick={() => setDialogOpen(true)}><Trash2 size={20}/></button>
                  <ConfirmDialog
                    isOpen={isDialogOpen}
                    title="Confirm Deletion"
                    message="Are you sure you want to delete? This action cannot be undone."
                    onConfirm={() => handleDelete(content._id)}
                    onCancel={handleCancel}
                  />
                </div>
              </div>
            ))
          }
      </div>
    </div>
  )
}

export default Contents