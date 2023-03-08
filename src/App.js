import "./App.css";
import { useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";

const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Web3Modal",
      infuraId: {
        3: "<INFURA_ID>",
      },
    },
  },
  metamask: {
    id: "injected",
    name: "MetaMask",
    type: "injected",
    check: "isMetaMask",
  },
  walletconnect: {
    package: "walletconnect",
    options: {
      infuraId: "<INFURA_ID>",
    },
  },
  trustwallet: {
    package: "trustwallet",
    options: {
      infuraId: "<INFURA_ID>",
    },
  },
};

function App() {
  const [web3Provider, setWeb3Provider] = useState(null);

  async function connectWallet() {
    try {
      let web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
      });
      const web3ModalIntance = await web3Modal.connect();
      const web3ModalProvider = new ethers.providers.Web3Provider(
        web3ModalIntance
      );
      console.log(web3ModalProvider);
      if (web3ModalProvider) {
        setWeb3Provider(web3ModalProvider);
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function disconnectWallet() {
    await web3Provider.provider._handleDisconnect();
    setWeb3Provider(null);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Web3Modal Connection</h1>
        {web3Provider ? (
          <div>
            <p>Connected!</p>
            <p>Address: {web3Provider.provider.selectedAddress}</p>
            <button onClick={disconnectWallet}>Disconnect wallet</button>
          </div>
        ) : (
          <button onClick={connectWallet}>Connect wallet</button>
        )}
      </header>
    </div>
  );
}

export default App;
