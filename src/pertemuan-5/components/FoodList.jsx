import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import dataMakanan from "../assets/dataMakanan.json";
import FoodCard from "./FoodCard";

const STAR_OPTIONS = [null, 1, 2, 3, 4, 5];

export default function FoodList() {
    const [query, setQuery] = useState("");
    const [starFilter, setStarFilter] = useState(null);

    const filtered = dataMakanan.filter((item) => {
        const q = query.toLowerCase();
        const matchesQuery =
            item.name.toLowerCase().includes(q) ||
            item.tag.toLowerCase().includes(q);
        const matchesStar =
            starFilter === null ||
            (item.rating >= starFilter && item.rating < starFilter + 1);
        return matchesQuery && matchesStar;
    });

    return (
        <div id="food-list-container" className="p-5">
            {/* Section Header */}
            <div id="food-list-header" className="flex items-center justify-between mb-4">
                <div id="food-list-title-group" className="flex flex-col">
                    <span id="food-list-title" className="text-xl font-bold text-teks">
                        Menu Makanan
                    </span>
                    <span id="food-list-subtitle" className="text-sm text-teks-samping">
                        {filtered.length} item ditemukan
                    </span>
                </div>

                {/* Search Bar */}
                <div id="food-search-wrapper" className="relative w-64">
                    <input
                        id="food-search-input"
                        type="text"
                        placeholder="Cari nama atau tag..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="border border-garis bg-white w-full rounded-lg px-4 py-2 pr-10 text-sm outline-none focus:border-hijau transition-colors"
                    />
                    <FaSearch
                        id="food-search-icon"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs"
                    />
                </div>
            </div>

            {/* Star Filter Buttons */}
            <div id="star-filter-wrapper" className="flex items-center gap-2 mb-4">
                {STAR_OPTIONS.map((star) => (
                    <button
                        key={star ?? "all"}
                        id={`star-filter-${star ?? "all"}`}
                        onClick={() => setStarFilter(star)}
                        className={`px-3 py-1 rounded-full text-sm font-semibold border transition-colors cursor-pointer
                            ${starFilter === star
                                ? "bg-hijau text-white border-hijau"
                                : "bg-white text-gray-500 border-garis hover:border-hijau hover:text-hijau"
                            }`}
                    >
                        {star === null ? "All" : `${"★".repeat(star)} ${star}`}
                    </button>
                ))}
            </div>

            {/* Cards Grid */}
            {filtered.length > 0 ? (
                <div id="food-card-grid" className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filtered.map((item) => (
                        <FoodCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <div id="food-empty-state" className="flex flex-col items-center justify-center py-12 text-gray-400">
                    <span className="text-4xl mb-2">&#127869;</span>
                    <span className="font-medium">Tidak ada makanan ditemukan</span>
                    <span className="text-sm mt-1">Coba kata kunci atau filter yang berbeda</span>
                </div>
            )}
        </div>
    );
}
