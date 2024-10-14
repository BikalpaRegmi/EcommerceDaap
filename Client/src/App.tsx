
import { ethers } from 'ethers';
import './App.css'
import { useEffect, useState } from "react";
import abi from "./contract.json/abi.json"
import Navbar from './components/Navbar';
import ListProducts from './components/ListProducts';
import { Route, Routes } from 'react-router-dom';
import AddProducts from './pages/AddProducts';

 interface appState {
  signer: ethers.Signer | null;
  provider: ethers.BrowserProvider | null;
  contract: ethers.Contract | null;
}

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [state, setState] = useState<appState>({
    provider: null , signer:null , contract:null,
  });
  const [account, setAccount] = useState<string | null>('not connected');

  const template = async() => {
    const contractAddress: string =
      "0x5FbDB2315678afecb367f032d93F642f64180aa3"; //to reach blockchain
    const contractAbi: any = abi.abi; //to interact with blockchain

     //metamask connection
    const ethereum = window.ethereum;
 
    if (ethereum) {
      const account:string[] = await ethereum.request({
        method: "eth_requestAccounts",
      });

      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });

      setAccount(account[0]);

      const provider : ethers.BrowserProvider = new ethers.BrowserProvider(ethereum);
      const signer: ethers.Signer = await provider.getSigner();
      const contract :ethers.Contract = new ethers.Contract(contractAddress, contractAbi, signer);

      setState({ signer, provider, contract });
    }else console.log('plz download metamask extension')
  }


  useEffect(() => {
    template();
  }, []);


  return (
    <>

    {
        state != null ? (<>
          
          <Navbar state={state} account={account} /> 
          
          <ListProducts state={state} />
          
        </>)
          :
          "error connecting to contract"
      }
      <Routes>
        <Route path='/AddProduct' element={<AddProducts state={ state } /> } />
      </Routes>
    </>
  )
}

export default App
