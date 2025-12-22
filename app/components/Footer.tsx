import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              BAKA<span className="text-white">NIME</span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Nonton anime subtitle Indonesia terlengkap dengan kualitas tinggi. Update setiap hari hanya di FANNIME.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Navigasi</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/anime" className="hover:text-white transition-colors">Anime List</Link></li>
              <li><Link href="/movie" className="hover:text-white transition-colors">Movies</Link></li>
              <li><Link href="/popular" className="hover:text-white transition-colors">Popular</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Bantuan</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="https://github.com/Rzfan03/bakanime-v2/issues?q=state%3Aopen%20label%3Abug" className="hover:text-white transition-colors">Lapor Bug</Link></li>
              <li><Link href="https://github.com/Rzfan03/bakanime-v2/issues?q=state%3Aopen%20label%3A%22Request%20Fitur%22" className="hover:text-white transition-colors">Request Fitur</Link></li>
              <li><Link href="https://sociabuzz.com/rzfann/tribe" className="hover:text-white transition-colors">Donate</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Social Media</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
            <p className="mt-4 text-xs text-gray-500 italic leading-relaxed">
              BAKANIME tidak menyimpan file di server kami. Semua konten disediakan oleh pihak ketiga.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-gray-500 text-xs">
            © {currentYear} BAKANIME. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Dibuat dengan ❤️ oleh FANNIME Team
          </p>
        </div>
      </div>
    </footer>
  );
}