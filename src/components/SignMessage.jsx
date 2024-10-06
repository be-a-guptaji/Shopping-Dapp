import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { useState } from "react";

export default function SignMessage() {
  const wallet = useWallet();
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState("");

  async function sign() {
    if (!publicKey) {
      throw new Error("Wallet not connected!");
    }
    if (!signMessage) {
      throw new Error("Wallet does not support message signing!");
    }
    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);

    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
      throw new Error("Message signature invalid!");
    }
    alert("Success", `Message signature: ${bs58.encode(signature)}`);
  }

  return (
    <>
      <h1 className="text-3xl font-semibold text-center my-8">
        Sign Message
      </h1>
      <div className="flex flex-col gap-4">
        <input
          value={message}
          type="text"
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
          className="border border-gray-600 rounded-lg h-10 px-4"
        />
        <button
          onClick={sign}
          className="rounded-lg h-12 px-2 bg-[#512da8] disabled:bg-gray-700"
        >
          Sign Message
        </button>
        {!wallet.connected && (
          <p className="mt-2 text-center">
            Please connect your wallet
          </p>
        )}
      </div>
    </>
  );
}
