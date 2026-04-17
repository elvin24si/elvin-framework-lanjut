import { useState } from "react";
import pcData from "./PCList.json";

export default function Whiteframe() {
    const [dataForm, setDataForm] = useState({
        searchTerm: "",
        selectedTag: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm((prev) => ({ ...prev, [name]: value }));
    };

    const filteredPCs = pcData.filter((pc) => {
        const _search = dataForm.searchTerm.toLowerCase();
        const searchableIndex = [
            pc.name, pc.gpuBrand, pc.gpuModel, pc.cpuBrand, pc.cpuModel, pc.coolerType, ...pc.tags
        ].join(" ").toLowerCase();

        const matchesSearch = searchableIndex.includes(_search);
        const matchesTag = dataForm.selectedTag
            ? [pc.gpuBrand, pc.cpuBrand, pc.coolerType, ...pc.tags].includes(dataForm.selectedTag)
            : true;

        return matchesSearch && matchesTag;
    });

    const filterOptions = [
        ...new Set(pcData.flatMap((pc) => [pc.gpuBrand, pc.cpuBrand, pc.coolerType, ...pc.tags])),
    ];

    return (
        <div className="min-h-screen bg-[#fcfcfc] text-slate-900 p-6 md:p-12 font-sans selection:bg-indigo-100">
            <div className="max-w-7xl mx-auto">

                {/* Minimalist Header */}
                <header className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-light tracking-[0.2em] text-slate-800 uppercase">
                            White<span className="font-bold">Frame</span> <span className="text-slate-400">Labs</span>
                        </h1>
                        <p className="text-[11px] text-slate-400 mt-2 uppercase tracking-widest">
                            High-Performance Computing / Est. 2026
                        </p>
                    </div>
                    <div className="h-[1px] flex-grow bg-slate-200 mx-8 hidden lg:block"></div>
                    <div className="flex gap-8 text-[10px] font-medium uppercase tracking-widest text-slate-500">
                        <span>Bespoke Build</span>
                        <span>Support</span>
                        <span className="text-indigo-600 font-bold">Catalog</span>
                    </div>
                </header>

                {/* Premium Search & Filter */}
                <div className="flex flex-col md:flex-row gap-0 mb-16 shadow-sm border border-slate-100 rounded-sm">
                    <div className="flex-grow relative">
                        <input
                            type="text"
                            name="searchTerm"
                            placeholder="Search specifications (e.g. RTX 4090, i9...)"
                            className="w-full bg-white p-5 text-sm outline-none placeholder:text-slate-300 transition-all"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-[1px] bg-slate-100 hidden md:block"></div>
                    <select
                        name="selectedTag"
                        className="bg-white p-5 text-[11px] font-bold uppercase tracking-widest text-slate-600 outline-none cursor-pointer md:w-72 appearance-none"
                        onChange={handleChange}
                    >
                        <option value="">All Architectures</option>
                        {filterOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                {/* PC Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredPCs.map((pc) => (
                        <div key={pc.id} className="group cursor-pointer">

                            {/* Image Container */}
                            <div className="relative aspect-[4/5] bg-[#f9f9f9] mb-6 overflow-hidden border border-slate-100 transition-all group-hover:border-indigo-200 shadow-sm hover:shadow-xl hover:shadow-indigo-50/50">

                                {/* PC Image */}
                                {pc.image ? (
                                    <img
                                        src={pc.image}
                                        alt={pc.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-[10px] text-slate-300 uppercase tracking-widest">Image_Pending</span>
                                    </div>
                                )}

                                {/* Hover Overlay: Detailed Specs Manifest */}
                                <div className="absolute inset-0 bg-white/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-center p-8">
                                    <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="border-b border-slate-100 pb-2">
                                            <p className="text-[10px] text-indigo-500 font-bold tracking-[0.2em] uppercase mb-1">Technical Manifest</p>
                                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">{pc.id}</h3>
                                        </div>

                                        {/* Compact Spec List */}
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-[9px] text-slate-400 uppercase tracking-widest">Processing Unit</p>
                                                <p className="text-xs text-slate-700 font-medium">{pc.cpuBrand} {pc.cpuModel}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-slate-400 uppercase tracking-widest">Graphics Engine</p>
                                                <p className="text-xs text-slate-700 font-medium">{pc.gpuBrand} {pc.gpuModel}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-slate-400 uppercase tracking-widest">Memory Buffer</p>
                                                <p className="text-xs text-slate-700 font-medium">{pc.ram}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-slate-400 uppercase tracking-widest">Thermal Solution</p>
                                                <p className="text-xs text-slate-700 font-medium">{pc.coolerType} // {pc.coolerModel}</p>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <span className="text-[10px] text-slate-400 italic">"Verified Build Stability 100%"</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Info (Visible Always) */}
                            <div className="space-y-1">
                                <div className="flex justify-between items-baseline">
                                    <h2 className="text-lg font-bold tracking-tight text-slate-900">
                                        {pc.name}
                                    </h2>
                                    <span className="text-sm font-light text-slate-400 tracking-tighter">${pc.price.toLocaleString()}</span>
                                </div>

                                <p className="text-[11px] text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
                                    {pc.gpuBrand} Powered Series
                                </p>

                                <button className="w-full mt-6 py-3 border border-slate-900 text-slate-900 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-slate-900 hover:text-white">
                                    Configure Build
                                </button>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Empty State */}
                {filteredPCs.length === 0 && (
                    <div className="text-center py-40">
                        <h3 className="text-slate-300 text-sm font-light tracking-widest uppercase italic">No configurations match your criteria.</h3>
                    </div>
                )}

                {/* Footer info */}
                <footer className="mt-32 pt-8 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 uppercase tracking-widest">
                    <span>&copy; 2026 WhiteFrame Labs</span>
                    <div className="flex gap-6">
                        <span>Privacy</span>
                        <span>Terms</span>
                    </div>
                </footer>
            </div>
        </div>
    );
}