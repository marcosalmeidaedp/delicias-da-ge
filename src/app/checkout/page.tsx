"use client";

import { useState } from "react";
import { useCarrinho } from "@/context/CartContext";
import Header from "@/components/Header";

export default function Checkout() {
  const { total } = useCarrinho();

  const [data, setData] = useState("");
  const [tipoEntrega, setTipoEntrega] = useState<"retirada" | "entrega">(
    "retirada"
  );
  const [endereco, setEndereco] = useState("");
  const [pagamento, setPagamento] = useState("pix");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function finalizarPedido() {
    if (!data) {
      alert("Selecione a data da encomenda.");
      return;
    }

    if (tipoEntrega === "entrega" && endereco.trim() === "") {
      alert("Informe o endereço de entrega.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/pagamento/pix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          total,
          email: "cliente@email.com",
        }),
      });

      const dataResponse = await response.json();

      if (!dataResponse.qr_code) {
        throw new Error("Erro ao gerar QR Code");
      }

      setQrCode(dataResponse.qr_code);
    } catch (error) {
      alert("Erro ao gerar o pagamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />

      <main className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-6">Finalizar Pedido</h1>

        {/* DATA */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Data da encomenda</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* ENTREGA */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Forma de entrega</label>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={tipoEntrega === "retirada"}
                onChange={() => setTipoEntrega("retirada")}
              />
              Retirada
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={tipoEntrega === "entrega"}
                onChange={() => setTipoEntrega("entrega")}
              />
              Entrega
            </label>
          </div>
        </div>

        {tipoEntrega === "entrega" && (
          <div className="mb-6">
            <label className="block mb-2 font-medium">Endereço</label>
            <textarea
              className="w-full border p-2 rounded"
              placeholder="Rua, número, bairro..."
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </div>
        )}

        {/* PAGAMENTO */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Forma de pagamento</label>
          <select
            className="w-full border p-2"
            value={pagamento}
            onChange={(e) => setPagamento(e.target.value)}
          >
            <option value="pix">PIX</option>
          </select>
        </div>

        {/* RESUMO */}
        <div className="border-t pt-4 mb-6">
          <p className="text-lg font-semibold">
            Total: R$ {total.toFixed(2)}
          </p>
        </div>

        {/* BOTÃO */}
        {!qrCode ? (
          <button
            onClick={finalizarPedido}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
          >
            {loading ? "Gerando pagamento..." : "Finalizar pedido"}
          </button>
        ) : (
          <div className="text-center mt-6">
            <p className="font-medium mb-2">Escaneie o QR Code para pagar</p>
            <img
              src={`data:image/png;base64,${qrCode}`}
              alt="QR Code PIX"
              className="mx-auto"
            />
            <p className="mt-4 text-sm text-gray-600">
              Após o pagamento, seu pedido será confirmado automaticamente.
            </p>
          </div>
        )}
      </main>
    </>
  );
}
