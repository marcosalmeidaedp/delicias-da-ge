"use client";

import { useCarrinho } from "@/context/CartContext";
import Header from "@/components/Header";

export default function Carrinho() {
  const { itens, total, removerItem, alterarQuantidade } = useCarrinho();

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">Seu Carrinho</h2>

        {itens.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <>
            {itens.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-3"
              >
                <div>
                  <p className="font-medium">{item.nome}</p>
                  <p className="text-sm text-gray-500">
                    R$ {item.preco.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      alterarQuantidade(item.id, item.quantidade - 1)
                    }
                    className="px-2 border"
                  >
                    -
                  </button>
                  <span>{item.quantidade}</span>
                  <button
                    onClick={() =>
                      alterarQuantidade(item.id, item.quantidade + 1)
                    }
                    className="px-2 border"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removerItem(item.id)}
                    className="ml-4 text-red-500"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 text-right">
              <p className="text-lg font-semibold">
                Total: R$ {total.toFixed(2)}
              </p>
              <a
                href="/checkout"
                className="inline-block mt-4 bg-black text-white px-6 py-3 rounded"
              >
                Continuar
              </a>
            </div>
          </>
        )}
      </main>
    </>
  );
}
