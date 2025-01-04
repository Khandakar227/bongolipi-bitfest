"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ChatbotPage() {
  const [chats, setChats] = useState<any[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [loadingResponse, setLoadingResponse] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<any[]>([]);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setSessionId(searchParams.get("sessionId") || "");

    fetch("/api/chat").then(async (res) => {
      const data = await res.json();
      console.log(data);
      setChatHistory(data.sessions);
    }).catch(console.error);
  }, []);

  useEffect(() => {
    if (!sessionId) {
      setChats([]);
      return
    };
    
    (async () => {
      const res = await fetch(`/api/chat/${sessionId}`);
      const data = await res.json();
      console.log(data);
      setChats(data);
    })();

  }, [sessionId])

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;
    setLoadingResponse(true);
    try {
      const res = await fetch(`/api/chat/generate?sessionId=${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: searchParams.get("sessionId"), content: currentMessage }),
      });

      const data = await res.json();
      console.log(data);
      
      setChats((prev) => [...prev, { role: "user", content: currentMessage }]);
      if (data.response) setChats((prev) => [...prev, { ...data.response }]);

      setSessionId(data.sessionId);
      router.push(`/chatbot?sessionId=${data.sessionId}`);
      setCurrentMessage("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingResponse(false);
    }
  };

  const newChat = () => {
    setSessionId("");
    setChats([]);
    setCurrentMessage("");
    router.push("/chatbot");
  }
  return (
    <div className="flex w-full h-screen bg-gradient-to-b bg-gray-300 text-gray-800">
      {/* Left Chat History */}
      <aside className="w-1/4 bg-gray-100 border-r border-gray-300 p-4">
        <button className="text-white rounded-md bg-primary my-4 px-4 py-2 block" onClick={newChat}>New Chat</button>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-4"
        >
          Chat History
        </motion.h2>
        <ul className="space-y-2 overflow-y-auto max-h-[calc(100vh-8rem)]">
          {
            chatHistory.map((sessionId, index) => (
              <li key={"s" +index} className="p-2 rounded-md bg-white shadow">
                <Link href={`/chatbot?sessionId=${sessionId}`}>{sessionId}</Link>
              </li>
            )) 
          }
        </ul>
      </aside>

      {/* Right Chat Area */}
      <main className="flex flex-col w-3/4 p-6">
        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto space-y-4 p-4 bg-white rounded shadow-inner">
          {chats.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "flex-row-reverse" : ""} justify-start items-center gap-4`}>
              <span className={`w-10 h-10 rounded-full ${message.role == "user" ? "bg-primary" : "bg-secondary"} flex items-center justify-center`}></span>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`p-3 rounded shadow ${message.role === "user" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"} w-fit`}>
                {message.content}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="mt-4 flex items-center space-x-4 sticky bottom-[10px] bg-white p-4 shadow-inner">
          <input
            type="text"
            placeholder="Type your message..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            className="flex-grow px-4 py-2 bg-gray-200 rounded text-gray-800 outline-none placeholder-gray-500 shadow"
          />
          <motion.button
            onClick={handleSendMessage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-primary hover:bg-primary rounded text-white font-semibold shadow"
          >
            Send
          </motion.button>
        </div>
      </main>
    </div>
  );
}