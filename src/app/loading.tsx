export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
          <div className="absolute inset-0 rounded-full border-4 border-t-[#FF6B4A] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        </div>
        <p className="text-slate-400 text-sm font-mono tracking-wider">
          LOADING...
        </p>
      </div>
    </div>
  );
}
