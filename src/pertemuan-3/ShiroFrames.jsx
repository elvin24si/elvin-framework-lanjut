import React from 'react';

export default function ShiroFrames() {
  return (
    <div className="min-h-screen bg-[#0f1115] text-slate-200 font-sans selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-[100] bg-[#0f1115]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rotate-45 flex items-center justify-center">
            <span className="text-black font-black -rotate-45 text-xl">S</span>
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">Shiro<span className="text-cyan-500">Frames</span></span>
        </div>
        <ul className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
          <li className="hover:text-cyan-500 cursor-pointer transition-colors">Prebuilts</li>
          <li className="hover:text-cyan-500 cursor-pointer transition-colors">Build Kits</li>
          <li className="hover:text-cyan-500 cursor-pointer transition-colors">Custom Desk</li>
          <li className="hover:text-cyan-500 cursor-pointer transition-colors">Consultation</li>
        </ul>
        <button className="bg-white text-black px-5 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-all">
          Start Project
        </button>
      </nav>

      {/* Hero Section */}
      <header className="relative py-24 px-6 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cyan-500/10 to-transparent blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto">
          <p className="text-cyan-500 font-mono text-xs uppercase tracking-[0.5em] mb-4">Masterpiece in Every Frame</p>
          <h1 className="text-6xl md:text-8xl font-black uppercase italic leading-[0.9] tracking-tighter mb-8">
            Define Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-cyan-800">Workspace.</span>
          </h1>
          <p className="max-w-xl text-slate-400 text-lg mb-10 leading-relaxed italic">
            Kami tidak hanya merakit PC. Kami membangun ekosistem digital yang mencerminkan jati diri Anda. Presisi tinggi, estetika tanpa kompromi.
          </p>
          <div className="flex gap-4">
            <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-black px-10 py-4 skew-x-[-12deg] transition-all">
              LIHAT PREBUILTS
            </button>
            <button className="border border-slate-700 hover:border-white text-white font-black px-10 py-4 skew-x-[-12deg] transition-all">
              PELAJARI JASA CUSTOM
            </button>
          </div>
        </div>
      </header>

      {/* Product Categories (Prebuilts) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">Signature Series</h2>
            <p className="text-slate-500 font-mono text-xs">Pilihan prebuilt terbaik untuk performa instan.</p>
          </div>
          <div className="h-[1px] flex-grow bg-slate-800 mx-8 hidden md:block"></div>
          <span className="text-cyan-500 font-bold text-sm">VIEW ALL // 08</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <BuildCard title="Minimalist White" desc="All-white components for the pure soul." price="Rp 15.5jt++" tag="WHITE" />
          <BuildCard title="The Ghost Silent" desc="No noise, pure performance focus." price="Rp 18.2jt++" tag="SILENT" />
          <BuildCard title="Anime Aesthetic" desc="Vibrant colors with custom UV print." price="Rp 22.0jt++" tag="ANIME" />
          <BuildCard title="Urban Sleeper" desc="Old school look, beast power inside." price="Rp 14.8jt++" tag="SLEEPER" />
        </div>
      </section>

      {/* Big Promotion: Custom Aesthetic Service */}
      <section className="py-24 px-6 bg-white text-black relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 text-[15rem] font-black text-black/[0.03] leading-none select-none pointer-events-none">CUSTOM</div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic leading-none mb-8 tracking-tighter">
              Bukan Sekadar <br /><span className="text-cyan-600">Rakitan Biasa.</span>
            </h2>
            <div className="space-y-6 text-slate-700 font-medium">
              <PromoPoint title="End-to-End Consultation" desc="Konsultasi penuh dari pemilihan parts hingga kecocokan warna ruangan Anda." />
              <PromoPoint title="Hand-Crafted Design" desc="Pengecatan kustom, engraving, dan cable management tingkat tinggi dengan tangan." />
              <PromoPoint title="Exclusive Warranty" desc="Dukungan teknis prioritas dan garansi desain seumur hidup." />
            </div>
            <button className="mt-12 bg-black text-white px-12 py-5 font-black uppercase italic tracking-widest hover:bg-cyan-600 transition-all flex items-center gap-4 group">
              KONSULTASI SEKARANG 
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </button>
          </div>
          <div className="relative">
            <div className="aspect-square bg-slate-200 border-8 border-black shadow-[30px_30px_0_#0891b2] flex items-center justify-center relative overflow-hidden group">
               {/* Placeholder for Product Image */}
               <div className="text-slate-400 font-black text-xl italic group-hover:scale-110 transition-transform duration-700">PREVIEW_CUSTOM_BUILD.JPG</div>
               <div className="absolute bottom-4 left-4 bg-black text-white text-[10px] px-3 py-1 font-bold">PROJECT: SHIRO_01</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <div className="flex justify-center gap-6 mb-8">
            <span className="text-slate-500 hover:text-white cursor-pointer transition-colors">INSTAGRAM</span>
            <span className="text-slate-500 hover:text-white cursor-pointer transition-colors">TWITTER</span>
            <span className="text-slate-500 hover:text-white cursor-pointer transition-colors">YOUTUBE</span>
        </div>
        <p className="text-[10px] text-slate-600 tracking-[0.3em] font-mono">© 2024 SHIROFRAMES ARSENAL. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}

// Sub-components untuk keterbacaan kode
function BuildCard({ title, desc, price, tag }) {
  return (
    <div className="bg-[#1a1d23] border border-white/5 p-6 hover:border-cyan-500/50 transition-all group">
      <div className="aspect-video bg-slate-800 mb-6 relative overflow-hidden">
         <div className="absolute top-2 left-2 bg-cyan-500 text-black text-[8px] font-black px-2 py-0.5">{tag}</div>
         <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
      </div>
      <h3 className="text-lg font-black uppercase italic text-white group-hover:text-cyan-400 transition-colors">{title}</h3>
      <p className="text-xs text-slate-500 mt-2 mb-4 leading-relaxed">{desc}</p>
      <div className="flex justify-between items-center pt-4 border-t border-white/5">
        <span className="font-mono text-sm font-bold text-white">{price}</span>
        <button className="text-[10px] font-black uppercase text-cyan-500 hover:text-white transition-colors">Details +</button>
      </div>
    </div>
  );
}

function PromoPoint({ title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 w-5 h-5 bg-cyan-600 flex-shrink-0"></div>
      <div>
        <h4 className="font-black uppercase text-sm tracking-tighter">{title}</h4>
        <p className="text-sm text-slate-500">{desc}</p>
      </div>
    </div>
  );
}