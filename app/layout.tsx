import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Bakanime V2",
  description: "Website streaming anime gratis dengan kualitas terbaik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#3b82f6', 
          colorBackground: '#111111',
        },
      }}
    >
    <html lang="en">
      <link
  rel="icon"
  href="/icon.ico"
  type="image/<generated>"
  sizes="<generated>"
/>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${jetbrainsMono.className} ${jetbrainsMono.variable} bg-[#0a0a0a] text-white antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
    </ClerkProvider>
  );
}