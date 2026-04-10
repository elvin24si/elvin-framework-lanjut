export default function InputField({ label, type, placeholder }) {
  return (
    <div className="mb-6 group">
      <label className="block text-xs font-mono tracking-[0.2em] text-gray-500 uppercase mb-2 group-focus-within:text-orange-500 transition-colors">
        // {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-[#1a1d23]/50 p-3 border-b-2 border-gray-800 focus:border-orange-500 outline-none text-white font-mono placeholder:text-gray-700 transition-all italic shadow-inner"
      />
    </div>
  )
}