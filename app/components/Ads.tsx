"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Ads() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="relative w-full max-w-[350px] bg-[#0f0f0f] border border-white/10 rounded-[2.5rem] p-9 text-center shadow-2xl">
        
        <div className="relative w-28 h-28 mx-auto mb-6">
          <Image
            src="https://media.tenor.com/ST1yMbfELuwAAAAj/genshin-genshin-impact.gif"
            fill
            alt="kawaii-gif"
            className="object-contain"
            unoptimized
          />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Dukung Kami!</h2>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          Suka nonton di sini? Yuk, bantu kami agar tetap bisa update setiap hari dengan memberikan dukungan sukarela.
        </p>

        <div className="space-y-3">
          <a
            href="https://sociabuzz.com/rzfann/tribe"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-blue-500 hover:text-white transition-all active:scale-95"
          >
            🎁 Support via Sociabuzz
          </a>
          
          <button
            onClick={() => setIsVisible(false)}
            className="block w-full py-2 text-gray-600 text-[10px] font-bold uppercase tracking-widest hover:text-gray-400 transition-colors"
          >
            Lanjut Nonton
          </button>
        </div>
      </div>
    </div>
  );
}