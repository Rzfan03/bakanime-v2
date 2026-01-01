export default function Loading() {
  return (
    <main className="h-screen w-full bg-[#050505] flex flex-col justify-center items-center">
      <div className="w-24 h-24">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <circle fill="#60A5FA" stroke="#60A5FA" strokeWidth="5" r="15" cx="40" cy="65">
            <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
          </circle>
          <circle fill="#60A5FA" stroke="#60A5FA" strokeWidth="5" r="15" cx="100" cy="65">
            <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
          </circle>
          <circle fill="#60A5FA" stroke="#60A5FA" strokeWidth="5" r="15" cx="160" cy="65">
            <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
          </circle>
        </svg>
      </div>
      <p className="mt-4 text-xs font-bold tracking-[0.3em] text-blue-400/60 uppercase animate-pulse">
        Bakaanime
      </p>
    </main>
  );
}