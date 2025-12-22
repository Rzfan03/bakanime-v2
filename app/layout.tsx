import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Script from "next/script";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Bakanime V2 - Streaming Anime Gratis Kualitas Terbaik",
  description: "Nonton anime subtitle Indonesia gratis dengan koleksi terlengkap dan kualitas video HD terbaik di Bakanime V2.",
  keywords: "nonton anime, streaming anime, anime sub indo, bakanime, bakanime v2, anime gratis",
  authors: [{ name: "Bakanime Team" }],
  openGraph: {
    title: "Bakanime V2",
    description: "Website streaming anime gratis dengan kualitas terbaik",
    url: "https://your-domain.com",
    icons:{

    },
    siteName: "Bakanime V2",
    images: [
      {
        url: "/logo.ico",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bakanime V2",
    description: "Streaming anime gratis kualitas terbaik",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <link
  rel="icon"
  href="/logo.ico"
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
  );
}