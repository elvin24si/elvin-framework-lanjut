import Container from "../components/Container";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import ProductCard from "../components/ProductCard";
import Table from "../components/Table";
import Footer from "../components/Footer";

export default function Components() {
  const headers = ["No", "Nama Produk", "Kategori", "Harga", "Aksi"];
  const products = [
    { id: 1, name: "Laptop Asus", category: "Elektronik", price: "Rp 8.000.000" },
    { id: 2, name: "Sepatu Sport", category: "Fashion", price: "Rp 450.000" },
    { id: 3, name: "Jam Tangan", category: "Aksesoris", price: "Rp 799.000" }
  ];

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">Component Playground</h1>

      {/* 1. Uji Coba Basic Components */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">1. Basic Components</h2>
        <div className="flex gap-2 items-center mb-4">
          <Button type="success">Simpan</Button>
          <Button type="danger">Hapus</Button>
        </div>
        <div className="flex gap-2 mb-4">
          <Badge type="success">Aktif</Badge>
          <Badge type="warning">Pending</Badge>
        </div>
        <div className="flex gap-2">
          <Avatar name="Budi"/>
          <Avatar name="Siti"/>
        </div>
      </section>

      {/* 2. Uji Coba Data Display Components (Card & ProductCard) */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">2. Data Display (Cards)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProductCard
            image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
            title="Sepatu Sport"
            category="Fashion"
            price="Rp 450.000"
            description="Sepatu sport modern dengan desain nyaman dan ringan."
          />
          <ProductCard
            image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
            title="Smartphone"
            category="Elektronik"
            price="Rp 4.500.000"
            description="Smartphone dengan performa cepat dan kamera jernih."
          />
        </div>
      </section>

      {/* 3. Uji Coba Data Display Components (Table) */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">3. Data Display (Table)</h2>
        <Table headers={headers}>
          {products.map((product, index) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="border px-4 py-3">{index + 1}</td>
              <td className="border px-4 py-3">{product.name}</td>
              <td className="border px-4 py-3">{product.category}</td>
              <td className="border px-4 py-3">{product.price}</td>
              <td className="border px-4 py-3">
                <Button type="primary">Detail</Button>
              </td>
            </tr>
          ))}
        </Table>
      </section>

      {/* 4. Footer */}
      <Footer />
    </Container>
  );
}