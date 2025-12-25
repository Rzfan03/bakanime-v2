import Link from "next/link";

export default function notFound(){
    return(
        <main>
            <div className="h-125 flex justify-center items-center flex-col gap-4">
                <div>
                    <h1 className="text-9xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">404</h1>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <p>lu nyari apaan kocak!</p>
                <Link href={'/'} className="hover:underline text-sm">kembali ke home</Link>
                </div>

            </div>
        </main>
    )
}