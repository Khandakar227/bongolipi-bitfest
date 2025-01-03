import { SignUp } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 via-gray-800 to-blue-900">
      <div className="bg-gray-100 p-8 shadow-lg rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <SignUp
          path="/sign-up"
          appearance={{
            variables: {
              colorPrimary: "#1d4ed8", // Blue accent
              colorBackground: "#e5e7eb", // Light background
              colorText: "#1f2937", // Dark text
            },
            layout: {
              socialButtonsPlacement: "bottom",
            },
          }}
        />
      </div>
    </div>
  );
}
