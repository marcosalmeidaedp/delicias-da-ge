import { NextResponse } from "next/server";
import MercadoPago from "mercadopago";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = new MercadoPago({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
    });

    const payment = await client.payment.create({
      transaction_amount: body.total,
      description: "Pedido - Delícias da Gê",
      payment_method_id: "pix",
      payer: {
        email: body.email || "cliente@email.com",
      },
    });

    return NextResponse.json({
      qr_code: payment.point_of_interaction.transaction_data.qr_code,
      qr_code_base64:
        payment.point_of_interaction.transaction_data.qr_code_base64,
    });
  } catch (error) {
    console.error("Erro Mercado Pago:", error);
    return NextResponse.json(
      { error: "Erro ao criar pagamento" },
      { status: 500 }
    );
  }
}
