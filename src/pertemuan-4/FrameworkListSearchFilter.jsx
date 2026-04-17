import frameworkData from "./framework.json";
import { useState } from "react";

export default function FrameworkListSearchFilter() {

    const [dataForm, setDataForm] = useState({
        searchTerm: "",
        selectedTag: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    // 3. Logic Sync
    const _searchTerm = dataForm.searchTerm.toLowerCase();

    const filteredFrameworks = frameworkData.filter((framework) => {
        const matchesSearch =
            framework.name.toLowerCase().includes(_searchTerm) ||
            framework.description.toLowerCase().includes(_searchTerm);

        const matchesTag = dataForm.selectedTag
            ? framework.tags.includes(dataForm.selectedTag)
            : true;

        return matchesSearch && matchesTag;
    });

    const allTags = [
        ...new Set(frameworkData.flatMap((framework) => framework.tags)),
    ];

    return (
        <div className="min-h-screen bg-[#0f1115] text-[#d1d5db] font-sans pb-24 selection:bg-orange-500/30 selection:text-orange-200 relative overflow-hidden">
            
            {/* Industrial Grid Overlay */}
            {/* <div className="fixed inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] pointer-events-none z-50"></div> */}

            <main className="max-w-7xl mx-auto px-6 pt-12 relative z-10">
                
                {/* Header Section */}
                <header className="mb-12 border-l-4 border-orange-500 pl-8 bg-gradient-to-r from-orange-500/10 to-transparent py-6">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <div className="text-[10px] font-mono text-orange-500/50 tracking-tighter uppercase">
                            Sektor 07 // Unified_State_Matrix
                        </div>
                    </div>
                    <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white leading-none">
                        FRAMEWORK <span className="text-orange-500">DATABASE</span>
                    </h1>
                </header>

                {/* Tactical Controls */}
                <div className="grid md:grid-cols-4 gap-4 mb-12">
                    <div className="md:col-span-3 relative group">
                        {/* Name must match state key: "searchTerm" */}
                        <input
                            type="text"
                            name="searchTerm" 
                            value={dataForm.searchTerm}
                            placeholder="CARI UNIT FRAMEWORK..."
                            className="w-full bg-[#14161c] border-2 border-gray-800 p-4 font-mono text-sm text-orange-500 focus:border-orange-500 outline-none transition-all placeholder:text-gray-700 uppercase"
                            onChange={handleChange}
                        />
                        <div className="absolute top-0 right-4 h-full flex items-center text-gray-700 font-mono text-[10px]">
                            STATE: {dataForm.searchTerm ? 'DATA_INPUT' : 'IDLE'}
                        </div>
                    </div>

                    <div className="relative group">
                        {/* Name must match state key: "selectedTag" */}
                        <select
                            name="selectedTag"
                            value={dataForm.selectedTag}
                            className="w-full bg-[#14161c] border-2 border-gray-800 p-4 font-mono text-xs text-white uppercase outline-none group-hover:border-orange-500 transition-colors appearance-none cursor-pointer"
                            onChange={handleChange}
                        >
                            <option value="">Semua_Kategori</option>
                            {allTags.map((tag) => (
                                <option key={tag} value={tag}>{tag}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-orange-500">
                            ▼
                        </div>
                    </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFrameworks.map((item) => (
                        <div
                            key={item.id}
                            className="group bg-[#14161c] border-2 border-gray-800 p-6 relative hover:border-orange-500 transition-all duration-300 shadow-[8px_8px_0px_rgba(0,0,0,0.3)] overflow-hidden"
                        >
                            <div className="absolute top-2 right-2 text-[8px] font-mono text-gray-600">
                                TAG_SYNC: {item.tags.includes(dataForm.selectedTag) ? 'MATCH' : 'LISTED'}
                            </div>

                            <h2 className="text-2xl font-black italic uppercase text-white mb-2 group-hover:text-orange-500 transition-colors">
                                {item.name}
                            </h2>

                            <p className="text-gray-400 text-sm font-mono mb-6 leading-relaxed h-20 overflow-hidden line-clamp-3">
                                &gt; {item.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {item.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter border transition-colors ${
                                            tag === dataForm.selectedTag 
                                            ? 'bg-orange-500 text-black border-orange-500' 
                                            : 'bg-orange-500/5 border-orange-500/20 text-orange-500/70'
                                        }`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-gray-800 flex flex-col gap-3">
                                <a
                                    href={item.details.officialWebsite}
                                    target="_blank"
                                    className="bg-white/5 border border-white/10 text-white text-center py-2 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-orange-500 hover:text-black transition-all skew-x-[-10deg]"
                                >
                                    Akses_Website
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredFrameworks.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed border-gray-800 font-mono text-gray-600">
                        &gt; ERROR: NO_MATCHES_FOUND_FOR_CRITERIA
                    </div>
                )}
            </main>
        </div>
    );
}