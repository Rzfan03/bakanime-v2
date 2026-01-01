"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { JetBrains_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains-mono" 
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#3b82f6", colorBackground: "#0a0a0a" },
      }}
    >
      <html lang="id" className="dark scroll-smooth">
        <body className={`${jetbrainsMono.variable} font-mono bg-[#0a0a0a] text-white antialiased`}>
          
          {isAuthPage ? (
            <div className="flex min-h-screen w-full bg-[#0a0a0a]">
              <div className="relative hidden lg:block lg:w-1/2 xl:w-[65%] h-screen sticky top-0">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a] z-10" />
                <div className="absolute inset-0 bg-blue-600/5 z-10" />
                <img 
                  src="https://cdn.wallpapersafari.com/42/28/rSMisC.jpg" 
                  alt="Auth Background"
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-16 left-16 z-20 max-w-xl">
                  <h2 className="text-6xl font-black text-white tracking-tighter italic leading-none">
                    BAKANIME<span className="text-blue-500">V2</span>
                  </h2>
                  <p className="text-gray-400 mt-4 text-lg font-light">
                    Streaming anime kualitas terbaik tanpa iklan mengganggu.
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-1/2 xl:w-[35%] min-h-screen flex flex-col justify-center items-center p-6 md:p-16">
                <div className="w-full max-w-[400px]">
                  <div className="lg:hidden text-center mb-8">
                    <h1 className="text-4xl font-black text-blue-500 italic uppercase">Bakanime</h1>
                  </div>
                  {children}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow pt-20">
                {children}
              </main>
              <Footer />
            </div>
          )}

        </body>
      </html>
    </ClerkProvider>
  );
}