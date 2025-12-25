"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function Navbar() {
  const { user } = useUser(); // Ambil data user
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
    setIsOpen(false);
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

            <div className="hidden lg:flex items-center space-x-1">
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

          
          <div className="hidden md:block flex-1 max-w-md relative" ref={searchRef}>
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
                className="w-full bg-white/5 text-sm text-white pl-4 pr-10 py-2 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all"
              />
              <div className="absolute right-3 top-2.5 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
            </div>

            {/* HASIL SEARCH DESKTOP */}
            {isSearching && search.length >= 3 && (
              <div className="absolute top-full mt-2 w-full bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {results.length > 0 ? (
                  <div className="max-h-[400px] overflow-y-auto p-2 space-y-1 scrollbar-hide">
                    {results.map((anime: any) => (
                      <button
                        key={anime.slug}
                        onClick={() => handleSelect(anime.slug)}
                        className="w-full flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors text-left"
                      >
                        <Image src={anime.poster} width={40} height={56} alt="" className="w-10 h-14 object-cover rounded-md" />
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

         
          <div className="flex items-center gap-3">
            <SignedOut>
              <div className="hidden sm:flex items-center gap-3">
                <SignInButton mode="modal">
                  <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors px-3 py-2">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl transition-all shadow-lg shadow-blue-500/20">
                    Daftar
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-3 bg-white/5 py-1.5 pl-3 pr-1.5 rounded-full border border-white/10">
               
                <span className="text-xs font-medium text-gray-200 hidden sm:block">
                  {user?.username || user?.firstName || "User"}
                </span>
                <UserButton 
                  afterSignOutUrl="/" 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8 border border-white/10"
                    }
                  }}
                />
              </div>
            </SignedIn>

           
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg border border-white/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isOpen ? <path d="M18 6 6 18M6 6l12 12"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-[#0a0a0a] border-b border-white/10 animate-in slide-in-from-top duration-300">
          <div className="px-4 py-6 space-y-6">
            
            <div className="relative" ref={searchRef}>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setIsSearching(true);
                }}
                placeholder="Cari anime..."
                className="w-full bg-white/5 text-sm text-white pl-4 pr-10 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
              
              {isSearching && search.length >= 3 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl z-[110] overflow-hidden">
                   {results.length > 0 ? (
                    <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
                      {results.map((anime: any) => (
                        <button
                          key={anime.slug}
                          onClick={() => handleSelect(anime.slug)}
                          className="w-full flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg text-left"
                        >
                          <Image src={anime.poster} width={40} height={56} alt="" className="w-10 h-14 object-cover rounded-md" />
                          <p className="text-sm font-medium text-white line-clamp-1">{anime.title}</p>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">Tidak ada hasil</div>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {["Home", "Anime", "Movie", "Popular"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl text-center text-sm font-medium border border-white/5"
                >
                  {item}
                </Link>
              ))}
            </div>
            
           
            <SignedOut>
              <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
                <SignInButton mode="modal">
                  <button className="w-full text-center text-white bg-white/5 border border-white/10 py-3 rounded-xl font-medium">Login</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full text-center text-white bg-blue-600 py-3 rounded-xl font-medium shadow-lg shadow-blue-500/10">Daftar Akun</button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  );
}