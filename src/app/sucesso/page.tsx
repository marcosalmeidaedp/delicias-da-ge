"use client";

import Link from "next/link";
import Header from "@/components/Header";

export default function Sucesso() {
  return (
    <>
      <Header />

      <main className="max-w-3xl mx-auto p-6 text-center">
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="text-green-600 text-5xl mb-4">✔</div>

          <h1 className="text-2xl font-semibold mb-2">
            Pedido realizado com sucesso!
          </h1>

          <p className="text-gray-600 mb-6">
            Obrigada por escolher a <strong>Delícias da Gê</strong> 💛  
            Seu pedido foi recebido e já está sendo preparado com carinho.
          </p>

          <div className="bg-gray-50 border rounded p-4 mb-6 text-left">
            <p><strong>Status:</strong> Pedido confirmado</p>
            <p><strong>Forma de pagamento:</strong> Conforme selecionado</p>
            <p><strong>Entrega:</strong> Conforme solicitado</p>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Em breve entraremos em contato pelo WhatsApp caso seja necessário.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/"
              className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
            >
              Voltar para o início
            </Link>

            <Link
              href="/cardapio"
              className="border px-6 py-3 rounded hover:bg-gray-100"
            >
              Fazer novo pedido
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
