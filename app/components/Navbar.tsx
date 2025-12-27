"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const AnimeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7h18"/><path d="M3 17h18"/><path d="M17 3v18"/></svg>;
const MovieIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="15" x="2" y="3" rx="2" ry="2"/><path d="M7 21h10"/><path d="M12 18v3"/></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const HistoryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;

export default function Navbar() {
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

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
    setIsMobileSearchOpen(false);
    router.push(`/anime/${slug}`);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                BAKA<span className="text-white">NIME</span>
              </Link>

              <div className="hidden lg:flex items-center space-x-1">
                {["Home", "Anime", "Movie", "Popular", "History"].map((item) => (
                  <Link
                    key={item}
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      (item === "Home" ? pathname === "/" : pathname === `/${item.toLowerCase()}`)
                        ? "text-white bg-white/10"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
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
                  className="w-full bg-white/5 text-sm text-white pl-4 pr-10 py-2 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
                <div className="absolute right-3 top-2.5 text-gray-500">
                  <SearchIcon />
                </div>
              </div>

              {isSearching && search.length >= 3 && (
                <div className="absolute top-full mt-2 w-full bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                  {results.length > 0 ? (
                    <div className="max-h-[400px] overflow-y-auto p-2 space-y-1">
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
                <SignInButton mode="modal">
                  <button className="text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl transition-all shadow-lg shadow-blue-500/20">
                    Login
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center gap-3 bg-white/5 py-1.5 pl-3 pr-1.5 rounded-full border border-white/10">
                  <span className="text-xs font-medium text-gray-200 hidden sm:block">
                    {user?.username || user?.firstName || "User"}
                  </span>
                  <UserButton 
                    afterSignOutUrl="/" 
                    appearance={{ elements: { userButtonAvatarBox: "w-8 h-8 border border-white/10" } }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-2xl border-t border-white/10 px-4 py-3 pb-8">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <Link href="/" className={`flex flex-col items-center gap-1 ${pathname === "/" ? "text-blue-400" : "text-gray-500"}`}>
            <HomeIcon />
            <span className="text-[10px] font-medium">Home</span>
          </Link>
          <Link href="/anime" className={`flex flex-col items-center gap-1 ${pathname === "/anime" ? "text-blue-400" : "text-gray-500"}`}>
            <AnimeIcon />
            <span className="text-[10px] font-medium">Anime</span>
          </Link>
          <button 
            onClick={() => setIsMobileSearchOpen(true)}
            className={`flex flex-col items-center gap-1 ${isMobileSearchOpen ? "text-blue-400" : "text-gray-500"}`}
          >
            <SearchIcon />
            <span className="text-[10px] font-medium">Search</span>
          </button>
          <Link href="/movie" className={`flex flex-col items-center gap-1 ${pathname === "/movie" ? "text-blue-400" : "text-gray-500"}`}>
            <MovieIcon />
            <span className="text-[10px] font-medium">Movie</span>
          </Link>
          <Link href="/history" className={`flex flex-col items-center gap-1 ${pathname === "/history" ? "text-blue-400" : "text-gray-500"}`}>
            <HistoryIcon />
            <span className="text-[10px] font-medium">History</span>
          </Link>
        </div>
      </div>

      {isMobileSearchOpen && (
        <div className="lg:hidden fixed inset-0 z-[110] bg-black/95 p-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setIsMobileSearchOpen(false)} className="text-white p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari anime..."
              className="flex-1 bg-white/10 text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh-120px)] space-y-3">
            {results.map((anime: any) => (
              <button key={anime.slug} onClick={() => handleSelect(anime.slug)} className="w-full flex items-center gap-4 bg-white/5 p-2 rounded-xl">
                <Image src={anime.poster} width={48} height={64} alt="" className="w-12 h-16 object-cover rounded-lg" />
                <div className="text-left">
                  <p className="text-white font-medium line-clamp-1">{anime.title}</p>
                  <p className="text-xs text-gray-500">{anime.status || "Completed"}</p>
                </div>
              </button>
            ))}
            {search.length >= 3 && results.length === 0 && (
              <p className="text-center text-gray-500 pt-10">Tidak ada hasil ditemukan</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}