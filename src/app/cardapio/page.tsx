"use client";

import Header from "@/components/Header";
import { useCarrinho } from "@/context/CartContext";

const produtos = [
  { id: 1, nome: "Bolo de Chocolate", preco: 45 },
  { id: 2, nome: "Brigadeiro Gourmet", preco: 3.5 },
];

export default function Cardapio() {
  const { adicionarItem } = useCarrinho();

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">Cardápio</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="border rounded-lg p-4 flex flex-col"
            >
              <h3 className="font-semibold">{produto.nome}</h3>
              <p className="text-gray-600">R$ {produto.preco.toFixed(2)}</p>

              <button
                onClick={() => adicionarItem(produto)}
                className="mt-auto bg-black text-white py-2 rounded hover:bg-gray-800"
              >
                Adicionar
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
