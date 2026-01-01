import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import MercadoPagoProvider from "@/components/MercadoPagoProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <MercadoPagoProvider>
          <CartProvider>{children}</CartProvider>
        </MercadoPagoProvider>
      </body>
    </html>
  );
}
