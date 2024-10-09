import { useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import AirdropPage from "../components/AirdropPage";
import SignMessage from "../components/SignMessage";

function Wallet() {
  const [section, setSection] = useState("airdrop");

  const handleSectionChange = (section) => {
    setSection(section);
  };

  return (
    <>
      <ConnectionProvider
        endpoint={
          "https://solana-devnet.g.alchemy.com/v2/SfymCb3jHNtavsH0Ht_x4nF75gbUnPrM"
        }
        autoConnect
      >
        <div className="md:w-1/2 w-11/12 mx-auto p-6 my-[10vh] rounded-lg border-y-4 border-green-400 bg-white">
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <div className="flex justify-center gap-8">
                <WalletMultiButton />
                <WalletDisconnectButton />
              </div>
              <div className="flex justify-between my-8 px-8">
                <button
                  className={`h-10 rounded-lg font-semibold w-1/3 border border-black/30 ${section === "airdrop" ? "bg-green-700" : "bg-green-200"} hover:bg-green-700`}
                  onClick={() => handleSectionChange("airdrop")}
                >
                  AirDrop
                </button>
                <button
                  className={`h-10 rounded-lg font-semibold w-1/3 border border-black/30 ${section === "verify" ? "bg-green-700" : "bg-green-200"}`}
                  onClick={() => handleSectionChange("verify")}
                >
                  Verify Message
                </button>
              </div>
              <div className="">
                {section === "airdrop" && <AirdropPage />}
                {section === "verify" && <SignMessage />}
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </div>
      </ConnectionProvider>
    </>
  );
}

export default Wallet;