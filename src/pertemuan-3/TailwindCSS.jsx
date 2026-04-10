import HitungGajiForm from "./HitungGajiForm";
import UserForm from "./UserForm";

export default function TailwindCSS() {
  return (
    // Background: Dark Carbon / Metallic industrial
    <div className="min-h-screen bg-[#0f1115] text-[#d1d5db] font-sans pb-24 selection:bg-orange-500/30 selection:text-orange-200 overflow-x-hidden">
      <FlexboxGrid />

      {/* Industrial Grid Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] pointer-events-none z-50"></div>

      <main className="max-w-7xl mx-auto px-6 space-y-12 mt-8">
        
        {/* Command Header */}
        <header className="py-12 relative border-l-4 border-orange-500 pl-8 bg-gradient-to-r from-orange-500/10 to-transparent">
          <div className="absolute top-0 left-0 text-[10px] font-mono text-orange-500/50 tracking-tighter uppercase">
            Sektor 04 // Central Command
          </div>
          <h1 className="text-6xl font-black italic tracking-tighter uppercase text-white leading-none">
            TAILWIND <span className="text-orange-500">Protocol</span>
          </h1>
          <p className="text-gray-400 text-sm font-mono mt-4 uppercase tracking-[0.2em]">
            [ Inisialisasi Sistem Tailwind CSS 4 // Siap Tempur ]
          </p>
          <div className="mt-10 flex gap-4">
            <button className="bg-orange-500 text-black font-black uppercase tracking-widest px-10 py-3 skew-x-[-12deg] hover:bg-white transition-all shadow-[0_0_15px_rgba(249,115,22,0.4)] active:translate-y-1">
              Mulai Misi
            </button>
            <BorderRadius />
          </div>
        </header>

        {/* Tactical Modules */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Spacing />
          <BackgroundColors />
          <ShadowEffects />
        </div>

        {/* Terminal Log Typography */}
        <div className="bg-[#1a1d23] border border-gray-800 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 bg-orange-500 text-black text-[10px] font-bold uppercase">
            Data Terenkripsi
          </div>
          <Typography />
        </div>

        {/* Data Input Section */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-[#14161c] border-2 border-gray-800 p-8 relative group">
             {/* Decorative Corner */}
            <div className="absolute -top-[2px] -left-[2px] w-8 h-8 border-t-4 border-l-4 border-orange-500"></div>
            <h2 className="text-xl font-black uppercase italic mb-8 text-white flex items-center gap-3">
              <span className="w-2 h-6 bg-orange-500 inline-block"></span>
              Registrasi_Unit
            </h2>
            <div className="tactical-form">
              <UserForm />
            </div>
          </div>
          
          <div className="bg-[#14161c] border-2 border-gray-800 p-8 relative group">
            <div className="absolute -top-[2px] -left-[2px] w-8 h-8 border-t-4 border-l-4 border-orange-500"></div>
            <h2 className="text-xl font-black uppercase italic mb-8 text-white flex items-center gap-3">
              <span className="w-2 h-6 bg-orange-500 inline-block"></span>
              Kalkulasi_Sumber_Daya
            </h2>
            <div className="tactical-form">
              <HitungGajiForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function FlexboxGrid() {
  return (
    <nav className="bg-[#0a0c10] border-b-2 border-orange-500/50 px-8 py-4 flex justify-between items-center sticky top-0 z-[100]">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-orange-500 flex items-center justify-center skew-x-[-15deg]">
          <span className="text-black font-black text-2xl skew-x-[15deg]">N</span>
        </div>
        <h1 className="text-2xl font-black tracking-tighter italic text-white">
          ARK_SYSTEM <span className="text-orange-500">v4</span>
        </h1>
      </div>
      
      <ul className="hidden md:flex space-x-8 text-xs font-bold uppercase tracking-widest">
        {['Markas', 'Inventori', 'Sektor'].map(item => (
          <li key={item}>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition border-b-2 border-transparent hover:border-orange-500 pb-1">
              {item}
            </a>
          </li>
        ))}
      </ul>

      <button className="bg-red-600/10 border border-red-600 text-red-500 px-6 py-1 text-xs font-black uppercase tracking-tighter hover:bg-red-600 hover:text-white transition-all">
        Putuskan Koneksi
      </button>
    </nav>
  );
}

function Spacing() {
  return (
    <div className="bg-[#1a1d23] border-r-4 border-orange-500 p-8 shadow-lg hover:bg-[#20242b] transition-all cursor-crosshair group">
      <div className="flex justify-between items-start mb-6">
        <div className="text-orange-500 text-3xl group-hover:rotate-90 transition-transform">⚙️</div>
        <span className="text-[10px] font-mono text-gray-500">ID: MODULE_01</span>
      </div>
      <h2 className="text-xl font-black uppercase text-white mb-4 italic">Modul: Spacing</h2>
      <p className="text-gray-400 text-sm leading-relaxed font-mono">
        Optimasi ruang visual. Menggunakan [ p-6 ] dan [ m-4 ] untuk efisiensi medan tempur UI.
      </p>
    </div>
  );
}

function Typography() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-4xl font-black italic text-white uppercase tracking-tighter">
          Tipografi <span className="text-orange-500">Taktis</span>
        </h1>
        <div className="h-1 flex-grow bg-gray-800"></div>
      </div>
      <p className="text-gray-300 text-lg font-mono leading-relaxed border-l-2 border-gray-700 pl-6">
        Log Sistem: Belajar Tailwind CSS sangat cepat dan efisien. Pastikan semua kelas utilitas sinkron dengan visualisasi command center.
      </p>
      <div className="bg-black/40 p-4 border-l-4 border-orange-500 font-mono text-xs text-orange-400">
        &gt; ANALISIS DATA SELESAI... SEMUA SISTEM BERJALAN NORMAL.
      </div>
    </div>
  );
}

function BorderRadius() {
  return (
    <button className="border-2 border-gray-700 text-gray-400 font-black uppercase tracking-widest px-10 py-3 skew-x-[-12deg] hover:border-orange-500 hover:text-white transition-all">
      Detail Unit
    </button>
  );
}

function BackgroundColors() {
  return (
    <div className="bg-gradient-to-br from-[#1a1d23] to-[#0f1115] border border-gray-800 p-8 relative overflow-hidden group">
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-orange-500/10 -rotate-45 translate-x-8 translate-y-8"></div>
      <h3 className="text-xl font-black uppercase text-white italic mb-3">Warna Command</h3>
      <p className="text-gray-400 font-mono text-sm leading-relaxed">
        Skema warna Ark: Hitam Karbon, Abu-abu Industri, dan Oranye Peringatan.
      </p>
    </div>
  );
}

function ShadowEffects() {
  return (
    <div className="bg-[#1a1d23] border border-gray-800 p-8 text-center relative group hover:border-orange-500 transition-all duration-300">
      <div className="absolute top-2 right-2 flex gap-1">
        <div className="w-1 h-1 bg-orange-500 animate-ping"></div>
        <div className="w-1 h-1 bg-orange-500"></div>
      </div>
      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🛡️</div>
      <h3 className="text-xl font-black uppercase text-white mb-2 italic">Efek Shadow</h3>
      <p className="text-gray-500 font-mono text-[11px] uppercase tracking-tighter">
        Aktifkan [ shadow-lg ] untuk kedalaman dimensi unit tempur.
      </p>
    </div>
  );
}