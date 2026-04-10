import { useState } from "react";

export default function HitungGajiForm() {
    const [gaji, setgaji] = useState("");
    const pajak = 0.11;
    const totalGaji = gaji - (gaji * pajak);

    return (
        <div className="w-full max-w-md mx-auto relative group">
            {/* Dekoratif Sudut Nikke */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-orange-500"></div>
            
            <div className="bg-[#14161c] p-8 border border-gray-800 shadow-2xl">
                <h2 className="text-xl font-black italic uppercase text-white mb-6 flex items-center gap-2">
                    <span className="w-1 h-5 bg-orange-500"></span>
                    Alokasi <span className="text-orange-500">Kredit</span>
                </h2>

                <div className="mb-6">
                    <label className="block text-[10px] font-mono tracking-widest text-gray-500 uppercase mb-2">
                        Basis Gaji Pokok (Kredit)
                    </label>
                    <input
                        type="number"
                        placeholder="INPUT JUMLAH..."
                        className="w-full bg-black/40 p-4 border border-gray-800 focus:border-orange-500 outline-none text-orange-500 font-mono text-xl"
                        onChange={(e) => setgaji(e.target.value)}
                    />
                </div>

                <div className="mb-6 py-3 border-y border-gray-800/50 flex justify-between items-center">
                    <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                        Pajak Sektor Arca
                    </label>
                    <b className="text-red-600 font-black italic animate-pulse">11%</b>
                </div>

                {!gaji || gaji <= 0 ? (
                    <div className="mt-4 p-4 bg-red-900/10 border-l-4 border-red-600">
                        <p className="text-[10px] font-mono text-red-500 leading-tight uppercase tracking-tighter">
                            [ PERINGATAN ]: MASUKKAN INPUT GAJI YANG VALID. SISTEM MEMBUTUHKAN DATA UNTUK KALKULASI.
                        </p>
                    </div>
                ) : (
                    <div className="mt-4 p-5 bg-orange-500 shadow-[0_0_25px_rgba(249,115,22,0.2)] skew-x-[-5deg]">
                        <p className="text-[10px] font-mono text-black font-bold uppercase mb-1">
                            Estimasi Bersih (THP):
                        </p>
                        <p className="text-2xl font-black text-black">
                            Rp {totalGaji.toLocaleString('id-ID')}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}