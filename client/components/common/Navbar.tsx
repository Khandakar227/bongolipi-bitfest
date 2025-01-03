"use client"
import Link from "next/link";
import MobileSidebar from "./MobileSidebar";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-10">
        <div className="flex px-4 shadow bg-white dark:bg-[#000f06] gap-4 justify-between items-center">
            <Link href={"/"}>
                <h1 className="text-bold text-white p-4 text-xl font-balooda">বঙ্গলিপি</h1>
            </Link>

            <div className="hidden md:block">
                <ul className="flex gap-6 pr-4 text-sm dark:text-gray-200 items-center">
                    <li className="font-semibold"><Link href={"/"}>Home</Link></li>
                    <li className="font-semibold group relative">
                        <Link href={"#features"}>Converter</Link>
                    </li>
                    <li className="font-semibold group relative">
                        <Link href={"#features"}>Contents</Link>
                    </li>
                    <li className="font-semibold group relative">
                        <Link href={"#features"}>Chatbot</Link>
                    </li>
                    <li className="font-semibold group relative">
                        <Link href={"#features"}>Contribute</Link>
                    </li>
                </ul>
            </div>

            <div className="md:hidden z-20">
                <MobileSidebar />
            </div>
        </div>
    </div>
  )
}
