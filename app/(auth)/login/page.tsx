import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">Selamat Datang!</h2>
        <p className="text-gray-400 mt-2">Silahkan masuk ke akun Anda.</p>
      </div>

      <SignIn 
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "bg-transparent shadow-none border-none p-0 w-full",
            header: "hidden", // Sembunyikan header asli Clerk karena kita buat custom di atas
            socialButtonsBlockButton: "bg-white/5 border-white/10 text-white hover:bg-white/10 h-12 rounded-xl transition-all",
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-sm normal-case h-12 rounded-xl shadow-lg shadow-blue-600/20",
            formFieldLabel: "text-gray-300 mb-1",
            formFieldInput: "bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-blue-500 focus:border-blue-500",
            footerActionText: "text-gray-400",
            footerActionLink: "text-blue-500 hover:text-blue-400 font-medium",
            dividerLine: "bg-white/10",
            dividerText: "text-gray-500"
          }
        }}
        signUpUrl="/register"
      />
    </div>
  );
}