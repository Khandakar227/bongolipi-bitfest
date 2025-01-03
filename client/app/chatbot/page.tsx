"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ChatbotPage() {
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    // Simulate a chat response (replace with actual API call)
    setChatHistory((prev) => [...prev, `You: ${currentMessage}`, `Bot: ...`]);
    setCurrentMessage("");
  };

  return (
    <div className="flex w-full h-screen bg-gradient-to-b bg-gray-300 text-gray-800">
      {/* Left Chat History */}
      <aside className="w-1/4 bg-gray-100 border-r border-gray-300 p-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-4"
        >
          Chat History
        </motion.h2>
        <ul className="space-y-2 overflow-y-auto max-h-[calc(100vh-8rem)]">
          {chatHistory.map((message, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              className="p-2 bg-gray-200 rounded shadow hover:bg-gray-300 transition"
            >
              {message}
            </motion.li>
          ))}
        </ul>
      </aside>

      {/* Right Chat Area */}
      <main className="flex flex-col w-3/4 p-6">
        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto space-y-4 p-4 bg-white rounded shadow-inner">
          {chatHistory.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`p-3 rounded shadow ${
                message.startsWith("You:")
                  ? "bg-blue-100 text-blue-800 self-end text-right"
                  : "bg-gray-100 text-gray-800 self-start text-left"
              }`}
            >
              {message}
            </motion.div>
          ))}
        </div>

        {/* Input Area */}
        <div className="mt-4 flex items-center space-x-4">
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
            className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded text-white font-semibold shadow"
          >
            Send
          </motion.button>
        </div>
      </main>
    </div>
  );
}
