"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearching(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSearch = async () => {
      if (search.length < 3) {
        setResults([]);
        return;
      }
      try {
        const res = await fetch(`https://www.sankavollerei.com/anime/stream/search/${search}`);
        const data = await res.json();
        setResults(data.data || []);
      } catch (err) {
        setResults([]);
      }
    };

    const debounce = setTimeout(fetchSearch, 500);
    return () => clearTimeout(debounce);
  }, [search]);

  const handleSelect = (slug: string) => {
    setSearch("");
    setIsSearching(false);
    router.push(`/anime/${slug}`);
  };

  return (
    <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              BAKA<span className="text-white">NIME</span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {["Home", "Anime", "Movie", "Popular"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-gray-400 hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex-1 max-w-md relative" ref={searchRef}>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setIsSearching(true);
                }}
                onFocus={() => setIsSearching(true)}
                placeholder="Cari anime..."
                className="w-full bg-white/5 text-sm text-white scrollbar-hide pl-4 pr-10 py-2 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all"
              />
              <div className="absolute right-3 top-2.5 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
            </div>

            {isSearching && search.length >= 3 && (
              <div className="absolute top-full mt-2 w-full bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {results.length > 0 ? (
                  <div className="max-h-[400px] overflow-y-auto p-2 space-y-1">
                    {results.map((anime: any) => (
                      <button
                        key={anime.slug}
                        onClick={() => handleSelect(anime.slug)}
                        className="w-full flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors text-left"
                      >
                        <Image src={anime.poster} width={150} height={150} alt="" className="w-10 h-14 object-cover rounded-md" />
                        <div>
                          <p className="text-sm font-semibold text-white line-clamp-1">{anime.title}</p>
                          <p className="text-xs text-gray-500">{anime.status || "Completed"}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-gray-500">Tidak ada hasil</div>
                )}
              </div>
            )}
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isOpen ? <path d="M18 6 6 18M6 6l12 12"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black border-b border-white/10 animate-in slide-in-from-top duration-300">
          <div className="px-4 py-4 space-y-1">
            {["Home", "Anime", "Movie", "Popular"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="block text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl text-base font-medium"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}