import frameworkData from "./framework.json";
import { useState } from "react";

export default function FrameworkListSearchFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const _searchTerm = searchTerm.toLowerCase();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm);

    const matchesTag = selectedTag ? framework.tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];

  return (
    <div className="min-h-screen bg-[#0f1115] text-[#d1d5db] font-sans pb-24 selection:bg-orange-500/30 selection:text-orange-200 relative overflow-hidden">
      
      {/* Industrial Grid Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] pointer-events-none z-50"></div>

      {/* Top Scanning Line Animation */}
      <div className="fixed top-0 left-0 w-full h-[1px] bg-orange-500/50 shadow-[0_0_15px_#f97316] z-[60] animate-[bounce_4s_infinite] opacity-20"></div>

      <main className="max-w-7xl mx-auto px-6 pt-12 relative z-10">
        
        {/* Header Section */}
        <header className="mb-12 border-l-4 border-orange-500 pl-8 bg-gradient-to-r from-orange-500/10 to-transparent py-6 relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <div className="text-[10px] font-mono text-orange-500/50 tracking-tighter uppercase">
              Sektor 07 // Live_Search_Active
            </div>
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white leading-none">
            FRAMEWORK <span className="text-orange-500 transition-all duration-700 hover:tracking-[0.1em]">DATABASE</span>
          </h1>
        </header>

        {/* Tactical Controls */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <div className="md:col-span-3 relative group">
            <input
              type="text"
              placeholder="CARI UNIT FRAMEWORK..."
              className="w-full bg-[#14161c] border-2 border-gray-800 p-4 font-mono text-sm text-orange-500 focus:border-orange-500 focus:bg-[#1a1d23] focus:shadow-[0_0_20px_rgba(249,115,22,0.1)] outline-none transition-all placeholder:text-gray-700 uppercase"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute bottom-0 left-0 h-[2px] bg-orange-500 transition-all duration-500 w-0 group-focus-within:w-full"></div>
          </div>

          <div className="relative group">
            <select
              className="w-full bg-[#14161c] border-2 border-gray-800 p-4 font-mono text-xs text-white uppercase outline-none group-hover:border-orange-500/50 transition-colors appearance-none cursor-pointer"
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option value="">Semua_Kategori</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFrameworks.map((item) => (
            <div
              key={item.id}
              className="group bg-[#14161c] border-2 border-gray-800 p-6 relative hover:border-orange-500 transition-all duration-300 hover:-translate-y-1 shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-[12px_12px_0px_rgba(249,115,22,0.1)] overflow-hidden"
            >
              {/* Card Scan Flash Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>

              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-orange-500 group-hover:animate-ping"></div>
                    <div className="text-[8px] font-mono text-gray-600 uppercase">Status: Online</div>
                </div>
                <div className="text-[8px] font-mono text-gray-600 uppercase tracking-tighter">
                  REF_ID: {item.id.toString().padStart(4, '0')}
                </div>
              </div>

              <h2 className="text-2xl font-black italic uppercase text-white mb-2 group-hover:text-orange-500 transition-colors">
                {item.name}
              </h2>

              <p className="text-gray-400 text-sm font-mono mb-6 leading-relaxed h-20 overflow-hidden line-clamp-3 group-hover:text-gray-300 transition-colors">
                &gt; {item.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-orange-500/5 border border-orange-500/20 text-orange-500/70 px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter group-hover:border-orange-500 group-hover:text-orange-500 transition-all duration-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-800 flex flex-col gap-3 group-hover:border-orange-500/20 transition-colors">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-gray-500 uppercase">Dev_Lead:</span>
                  <span className="text-gray-300 font-bold uppercase">{item.details.developer}</span>
                </div>
                
                <a
                  href={item.details.officialWebsite}
                  target="_blank"
                  className="bg-white/5 border border-white/10 text-white text-center py-2 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-orange-600 hover:text-black hover:tracking-[0.4em] transition-all duration-300 skew-x-[-10deg] active:scale-95"
                >
                  Buka_Dokumen
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Global CSS for the Shimmer effect (Standard Tailwind doesn't have a partial shimmer) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
}