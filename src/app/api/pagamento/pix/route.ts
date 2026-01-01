import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
    });

    const payment = new Payment(client);

    const result = await payment.create({
      transaction_amount: body.total,
      description: "Pedido - Delícias da Gê",
      payment_method_id: "pix",
      payer: {
        email: body.email || "cliente@email.com",
      },
    });

    return NextResponse.json({
      qr_code: result.point_of_interaction.transaction_data.qr_code,
      qr_code_base64:
        result.point_of_interaction.transaction_data.qr_code_base64,
    });
  } catch (error) {
    console.error("Erro Mercado Pago:", error);
    return NextResponse.json(
      { error: "Erro ao gerar pagamento" },
      { status: 500 }
    );
  }
}
