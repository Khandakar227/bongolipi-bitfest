"use client";

import { motion } from "framer-motion";
import { FaMagic, FaRobot, FaSearch, FaMicrophone, FaEdit, FaChartBar, FaFont } from "react-icons/fa";

const features = [
  {
    icon: <FaMagic size={40} />,
    name: "Banglish to Bangla Conversion",
    description: "Easily convert Banglish text into beautiful Bangla with high accuracy using our robust translation model.",
  },
  {
    icon: <FaEdit size={40} />,
    name: "Content Creation & Management",
    description:
      "Write stories or paragraphs in Banglish and convert them into Bangla. Export them as PDFs with AI-generated titles and captions.",
  },
  {
    icon: <FaSearch size={40} />,
    name: "App-Wide Search",
    description: "Search for user-uploaded PDFs and profiles effortlessly using Bangla or Banglish queries.",
  },
  {
    icon: <FaRobot size={40} />,
    name: "Interactive Chatbot",
    description:
      "Chat with an AI-powered bot in Bangla or Banglish. Get PDF-based query responses with accurate Bangla outputs.",
  },
  {
    icon: <FaMicrophone size={40} />,
    name: "Voice Interaction",
    description:
      "Input text using voice in Bangla or English. Let the chatbot respond with voice outputs in Bangla.",
  },
  {
    icon: <FaMagic size={40} />,
    name: "Smart Editor",
    description: "Automatically correct common typing errors in Banglish for a smoother experience.",
  },
  {
    icon: <FaEdit size={40} />,
    name: "Real-Time Collaboration",
    description: "Collaborate with multiple users in real time to create or translate content seamlessly.",
  },
  {
    icon: <FaChartBar size={40} />,
    name: "Analytics Dashboard",
    description:
      "Track metrics like words translated, stories written, and chatbot interactions with detailed analytics.",
  },
  {
    icon: <FaFont size={40} />,
    name: "Customizable Fonts",
    description: "Choose from a variety of Bangla fonts when generating PDFs for a personalized experience.",
  },
  {
    icon: <FaMagic size={40} />,
    name: "Training with Continuous Learning",
    description: "Contribute new Banglish-Bangla text pairs to improve the translation system over time.",
  },
];

export default function FeatureSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-100 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-gray-800 mb-8"
        >
          Explore Our Features
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg text-gray-600 mb-16"
        >
          Experience innovation with these amazing features designed to enhance your Bangla communication.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="flex items-center justify-center text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.name}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
