export default function FoodCard({ item }) {
    return (
        <div id={`food-card-${item.id}`} className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3">
            <div id={`food-card-header-${item.id}`} className="flex items-center justify-between">
                <span id={`food-tag-${item.id}`} className="text-xs font-semibold bg-green-100 text-hijau px-3 py-1 rounded-full">
                    {item.tag}
                </span>
                <div id={`food-rating-${item.id}`} className="flex items-center gap-1 text-kuning font-semibold text-sm">
                    <span>&#9733;</span>
                    <span>{item.rating}</span>
                </div>
            </div>

            <div id={`food-info-${item.id}`} className="flex flex-col gap-1">
                <span id={`food-name-${item.id}`} className="text-teks font-bold text-lg leading-tight">
                    {item.name}
                </span>
                <span id={`food-price-${item.id}`} className="text-hijau font-semibold text-base">
                    Rp {item.price.toLocaleString("id-ID")}
                </span>
            </div>
        </div>
    );
}
