import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp 
      appearance={{
        elements: {
          card: "bg-[#141414] border border-white/10 shadow-2xl",
          headerTitle: "text-white",
          headerSubtitle: "text-gray-400",
          socialButtonsBlockButton: "bg-white/5 border-white/10 text-white hover:bg-white/10",
          formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
          footerActionLink: "text-blue-500 hover:text-blue-400"
        }
      }}
    />
  );
}