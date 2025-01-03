"use client";
import Link from "next/link";
import MobileSidebar from "./MobileSidebar";
import { Search } from "lucide-react";
import { useState } from "react";
import { useAuth, UserButton } from "@clerk/nextjs";
import Button from "./Button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="flex px-6 py-3 shadow-lg bg-gradient-to-r from-blue-900 via-gray-800 to-blue-900 text-white gap-4 justify-between items-center">
        {/* Logo */}
        <Link href={"/"}>
          <h1 className="text-bold text-3xl font-balooda tracking-wide hover:scale-110 transition-transform">
            বঙ্গলিপি
          </h1>
        </Link>

            <div className="hidden md:block">
                <ul className="flex gap-6 pr-4 text-sm items-center">
                    <li className="font-semibold"><Link href={"/"}>Home</Link></li>
                    <li className="font-semibold group relative">
                        <Link href={"/converter"}>Converter</Link>
                    </li>
                    <li className="font-semibold group relative">
                        <Link href={"/contents"}>Contents</Link>
                    </li>
                    <li className="font-semibold group relative">
                        <Link href={"#features"}>Chatbot</Link>
                    </li>
                    <li className="font-semibold group relative">
                        <Link href={"#features"}>Contribute</Link>
                    </li>
                </ul>
            </div>
        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex w-1/2 items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-full shadow-inner overflow-hidden"
        >
          <input
            type="text"
            placeholder="Search for PDFs, profiles, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow px-4 py-2 text-white bg-transparent text-sm outline-none placeholder-gray-300"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-blue-800 to-blue-600 text-white hover:from-blue-700 hover:to-blue-500 transition"
          >
            <Search />
          </button>
        </form>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <ul className="flex gap-6 pr-4 text-sm items-center">
            {["Home", "Converter", "Contents", "Chatbot", "Contribute"].map(
              (item, index) => (
                <li
                  key={index}
                  className="font-semibold hover:text-blue-400 transition-colors duration-300"
                >
                  <Link href={`/${item.toLowerCase()}`}>{item}</Link>
                </li>
              )
            )}
          </ul>

          {/* Authentication */}
          {isSignedIn ? (
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-10 h-10",
                  userButtonPopoverCard: "w-72 h-auto",
                },
              }}
            />
          ) : (
            <Button
              type="button"
              title="Login"
              icon="/user.svg"
              variant="btn_primary"
              onClick={() => router.push("/sign-in")}
            />
          )}
        </div>

            <div className="md:hidden z-20">
                <MobileSidebar />
            </div>
        </div>
    </div>
  );
}
