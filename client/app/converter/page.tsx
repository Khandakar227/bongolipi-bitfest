"use client";
import { BANGLISH_API } from "@/lib/const";
import { ArrowBigRight } from "lucide-react";
import { useState } from "react";

export default function Converter() {
  const [banglish, setBanglish] = useState("");
  const [bangla, setBangla] = useState("");
  const [loading, setLoading] = useState(false);

  const onTranslate = async () => {
    try {
      if (!banglish) return;
      setBangla("");
      const url = `${BANGLISH_API}/banglish`;
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: banglish }),
      };
      setLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      setBangla(data.generated_text);
    } catch (err) {
      alert("Something went wrong. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen">
      <div className="py-12">
        <h1 className="text-center text-2xl font-bold">
          Banglish to Bangla সহজে লিখুন বাংলায়
        </h1>
        <p className="py-4 flex gap-2 justify-center items-center text-lg">
          <span>Ajke amar mon bhalo nei</span> <ArrowBigRight /> আজকে আমার মন
          ভালো নেই
        </p>
      </div>

      <div className="py-12 px-4">
        <div className="grid md:grid-cols-2 gap-4 items-stretch w-full">
          <textarea
            value={banglish}
            onChange={(e) => setBanglish(e.target.value)}
            className="p-4 shadow bg-white rounded border min-h-40"
            placeholder="Ekhane kichu ekta likhun..."
          ></textarea>

          <textarea
            value={bangla}
            readOnly
            className="p-4 shadow bg-white rounded border min-h-40"
            placeholder="এখানে বাংলা লেখা দেখতে পাবেন..."
          ></textarea>
        </div>
        <button
          onClick={onTranslate}
          disabled={loading}
          className="bg-primary p-4 rounded font-semibold text-white mt-4"
        >
          {loading ? "Translating..." : "Translate"}
        </button>
      </div>
    </div>
  );
}

