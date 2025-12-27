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
  title: {
    default: "Bakanime V2 - Nonton Anime Gratis Sub Indo Terlengkap",
    template: "%s | Bakanime V2",
  },
  description: "Bakanime V2 adalah platform streaming anime gratis dengan kualitas video terbaik, update cepat, dan koleksi terlengkap tanpa iklan mengganggu.",
  keywords: ["nonton anime", "anime sub indo", "streaming anime", "bakanime v2", "anime gratis"],
  authors: [{ name: "rzfann" }],
  metadataBase: new URL("https://bakanime-v2.vercel.app"),
  openGraph: {
    title: "Bakanime V2 - Nonton Anime Gratis Sub Indo",
    description: "Streaming anime favoritmu dengan kualitas terbaik dan update setiap hari.",
    url: "https://bakanime-v2.vercel.app",
    siteName: "Bakanime V2",
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: "/logo.ico",
    shortcut: "/logo.ico",
    apple: "/logo.ico",
  },
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
          colorBackground: '#0a0a0a',
        },
      }}
    >
      <html lang="id" className="scroll-smooth">
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
            {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}