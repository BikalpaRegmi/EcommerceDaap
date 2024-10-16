import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from '../bytecode/abi.json';

interface EthereumContextType {
  signer: ethers.Signer | null,
  contract: ethers.Contract | null,
  provider: ethers.BrowserProvider | null,
  account: string | null,
  setState:Dispatch<SetStateAction<EthereumContextType>>,
}

interface EthereumContextProps {
  children:ReactNode,
}

declare global {
  interface Window {
    ethereum:any,
  }
}

const EthereumContext = createContext<EthereumContextType | undefined>(undefined);

export const EthereumContextProvider = ({ children }: EthereumContextProps) => {
  const [state, setState] = useState<EthereumContextType>({
    signer: null,
    contract: null,
    provider: null,
    account: null,
    setState : ()=>{},
  });
   
  const template = async() => {
    const address: string = "0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1";
    const contractAbi:any = abi.abi;

    const ethereum = window.ethereum;

    if (ethereum) {
      const account:string[] = await ethereum.request({
        method: "eth_requestAccounts",
      });

      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      
      const provider:ethers.BrowserProvider = new ethers.BrowserProvider(ethereum);
      const signer : ethers.Signer = await provider.getSigner();
      const contract: ethers.Contract = new ethers.Contract(address, contractAbi, signer);
      setState((prevState) => ({
        ...prevState,
        signer: signer,
        contract: contract,
        provider: provider,
        account:account[0],
      }))

    }else console.log('plz install metamask extension')
  }

  useEffect(() => {
    template();
  }, []);

  return (<>
    <EthereumContext.Provider value={state}>
      { children }
   </EthereumContext.Provider>
  </>)
}

export const useEthereum = () => {
  const context = useContext(EthereumContext);
  if (!context) throw new Error("plz wrap children with EthereumContextProvider");
  return context;
}