export async function POST(req) {
    const { wallet, amount } = await req.json();
    try {
      const client = wallet.client;
      const transaction = {
        sender: wallet.keypair.getPublicKey().toSuiAddress(),
        recipient: "RecipientSuiAddress",
        amount: parseInt(amount, 10),
      };
  
      const response = await client.transferCoin(transaction);
      return new Response(JSON.stringify({ success: true, transactionHash: response.transactionHash }), { status: 200 });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: err.message }), { status: 400 });
    }
  }
  