"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Produto = {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
};

type CartContextType = {
  itens: Produto[];
  adicionarItem: (produto: Omit<Produto, "quantidade">) => void;
  removerItem: (id: number) => void;
  alterarQuantidade: (id: number, quantidade: number) => void;
  limparCarrinho: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [itens, setItens] = useState<Produto[]>([]);

  // Carregar do localStorage
  useEffect(() => {
    const dados = localStorage.getItem("carrinho");
    if (dados) setItens(JSON.parse(dados));
  }, []);

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(itens));
  }, [itens]);

  function adicionarItem(produto: Omit<Produto, "quantidade">) {
    setItens((prev) => {
      const existe = prev.find((p) => p.id === produto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === produto.id
            ? { ...p, quantidade: p.quantidade + 1 }
            : p
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  }

  function removerItem(id: number) {
    setItens((prev) => prev.filter((p) => p.id !== id));
  }

  function alterarQuantidade(id: number, quantidade: number) {
    setItens((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantidade: Math.max(1, quantidade) } : p
      )
    );
  }

  function limparCarrinho() {
    setItens([]);
  }

  const total = itens.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  return (
    <CartContext.Provider
      value={{
        itens,
        adicionarItem,
        removerItem,
        alterarQuantidade,
        limparCarrinho,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCarrinho() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCarrinho deve ser usado dentro de CartProvider");
  }
  return context;
}
