import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Doces artesanais feitos com carinho
        </h2>

        <p className="text-gray-600 mb-8">
          Encomende seus doces favoritos com facilidade e segurança.
        </p>

        <a
          href="/cardapio"
          className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
        >
          Fazer pedido
        </a>
      </main>
    </>
  );
}
