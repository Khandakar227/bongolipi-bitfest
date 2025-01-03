// "use client";

// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";

// export default function HeroSection() {
//   const router = useRouter();

//   return (
//     <div className="relative w-full h-screen bg-gradient-to-b from-white to-blue-500">
//       {/* Animated Heading */}
//       <motion.div
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1, ease: "easeInOut" }}
//         className="absolute inset-0 flex flex-col items-center justify-center text-center gap-6 z-10"
//       >
//         <h1 className="text-5xl md:text-6xl font-bold text-white tracking-wide">
//           Empower Your World in Bangla
//         </h1>
//         <p className="text-lg md:text-xl text-white max-w-2xl">
//           Seamlessly bridge the gap between Banglish and Bangla while exploring innovative features designed for you.
//         </p>

//         {/* Buttons */}
//         <div className="flex gap-6">
//           <motion.button
//             onClick={() => router.push("/sign-up")}
//             className="px-8 py-3 bg-blue-700 hover:bg-white text-white text-lg font-semibold rounded-full shadow-lg transition"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Join Us
//           </motion.button>
//           <motion.button
//             onClick={() => router.push("/features")}
//             className="px-8 py-3 bg-indigo-700 hover:bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-lg transition"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Explore Features
//           </motion.button>
//         </div>
//       </motion.div>

//       {/* Animated Gradient Overlay */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.5, ease: "easeInOut" }}
//         className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-700 z-0"
//       />
//     </div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/Header.jpg')" }} // Replace with your image path
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-blue-300/70 to-blue-500/70"></div>

      {/* Animated Content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute right-10 top-1/2 transform -translate-y-1/2 flex flex-col items-end text-right gap-6 z-10"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-wide">
          Empower Your World in Bangla
        </h1>
        <p className="text-lg md:text-xl text-white max-w-lg">
          Seamlessly bridge the gap between Banglish and Bangla while exploring innovative features designed for you.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <motion.button
            onClick={() => router.push("/sign-up")}
            className="px-8 py-3 bg-blue-700 hover:bg-white text-white hover:text-blue-700 text-lg font-semibold rounded-full shadow-lg transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Us
          </motion.button>
          <motion.button
            onClick={() => router.push("/features")}
            className="px-8 py-3 bg-indigo-700 hover:bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-lg transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Features
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
