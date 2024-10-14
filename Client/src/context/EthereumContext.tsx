
import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../contract.json/abi.json"; 

interface EthereumContextType {
  signer: ethers.Signer | null;
  provider: ethers.BrowserProvider | null;
  contract: ethers.Contract | null;
  account: string | null;
}

declare global {
  interface Window {
    ethereum: any;
  }
}

const EthereumContext = createContext<EthereumContextType | undefined>(
  undefined
);

export const EthereumProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<EthereumContextType>({
    provider: null,
    signer: null,
    contract: null,
    account: "not connected",
  });

  const template = async () => {
    const contractAddress: string =
      "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const contractAbi: any = abi.abi;

    const ethereum = window.ethereum;

    if (ethereum) {
      const account: string[] = await ethereum.request({
        method: "eth_requestAccounts",
      });

      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });

      const provider: ethers.BrowserProvider = new ethers.BrowserProvider(
        ethereum
      );
      const signer: ethers.Signer = await provider.getSigner();
      const contract: ethers.Contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      setState({ signer, provider, contract, account: account[0] });
    } else {
      console.log("Please install MetaMask extension");
    }
  };

  useEffect(() => {
    template();
  }, []);

  return (
    <EthereumContext.Provider value={state}>
      {children}
    </EthereumContext.Provider>
  );
};

// Hook to use the Ethereum context
export const useEthereum = () => {
  const context = useContext(EthereumContext);
  if (!context) {
    throw new Error("useEthereum must be used within an EthereumProvider");
  }
  return context;
};
