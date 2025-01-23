import { parseEther } from "ethers";

export async function POST(req) {
  const { wallet, amount } = await req.json();
  try {
    const value = parseEther(amount);
    const transactionHash = await wallet.sendTransaction({
      to: "0xRecipientAddress", // Replace with recipient address
      value,
    });
    return new Response(JSON.stringify({ success: true, transactionHash }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 400 });
  }
}
