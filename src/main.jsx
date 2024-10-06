import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/Store.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ConnectionProvider
        endpoint={
          "https://solana-devnet.g.alchemy.com/v2/SfymCb3jHNtavsH0Ht_x4nF75gbUnPrM"
        }
        autoConnect
      >
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <App />
            <Toaster />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </Provider>
  </BrowserRouter>
);
