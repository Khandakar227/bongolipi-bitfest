"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs"; // Correct hook for accessing user info
import { useRouter } from "next/navigation";

export default function AfterSignUpPage() {
  const { user } = useUser(); // Access user details
  const router = useRouter();

  useEffect(() => {
    const saveUserToDatabase = async () => {
      if (!user) return;

      const { id, firstName, lastName, emailAddresses } = user;

      try {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: id,
            firstName,
            lastName,
            email: emailAddresses[0].emailAddress, // Primary email address
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save user.");
        }

        // Redirect to dashboard or home after successful database entry
        router.push("/");
      } catch (error) {
        console.error("Error saving user:", error);
        alert("Failed to save user. Please try again.");
      }
    };

    saveUserToDatabase();
  }, [user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-lg text-gray-700">Finalizing your setup...</p>
    </div>
  );
}
