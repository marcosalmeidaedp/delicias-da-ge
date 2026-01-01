import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const amount = Number(body.total);

    if (!amount || isNaN(amount)) {
      return NextResponse.json(
        { error: "Valor inválido" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transaction_amount: amount,
        description: "Pedido - Delícias da Gê",
        payment_method_id: "pix",
        payer: {
          email: body.email || "cliente@teste.com",
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("ERRO MERCADO PAGO:", data);
      return NextResponse.json(
        { error: "Erro ao gerar pagamento", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({
      qr_code: data.point_of_interaction.transaction_data.qr_code,
      qr_code_base64:
        data.point_of_interaction.transaction_data.qr_code_base64,
    });
  } catch (err) {
    console.error("ERRO INTERNO:", err);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
