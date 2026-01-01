"use client";

import { initMercadoPago } from "@mercadopago/sdk-react";

export default function MercadoPagoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!);

  return <>{children}</>;
}
