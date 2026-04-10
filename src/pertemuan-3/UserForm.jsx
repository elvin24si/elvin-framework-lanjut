import InputField from './components/InputField.jsx';

export default function UserForm() {
  return (
    <div className="w-full max-w-md mx-auto p-[2px] bg-gradient-to-b from-gray-700 to-gray-900 shadow-2xl">
      <div className="bg-[#0f1115] p-8 border border-gray-800">
        <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
          <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">
            Pendaftaran <span className="text-orange-500">Unit</span>
          </h2>
          <span className="text-[10px] font-mono text-orange-500/50">ST-2026</span>
        </div>

        <div className="space-y-2">
          <InputField label="Nama Lengkap" type="text" placeholder="MASUKKAN IDENTITAS..."/>
          <InputField label="Email Arca" type="email" placeholder="ALAMAT@NETWORK.COM..."/>
          <InputField label="Tanggal Aktivasi" type="date" />
        </div>

        <button className="w-full mt-6 bg-orange-600 hover:bg-white text-black font-black uppercase tracking-[0.3em] py-4 transition-all skew-x-[-10deg] shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-orange-500/50">
          Simpan Data
        </button>
      </div>
    </div>
  );
}