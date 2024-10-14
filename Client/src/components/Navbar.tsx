import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

interface navProps {
    state: {
        provider: ethers.BrowserProvider | null, 
        signer: ethers.Signer|null,
        contract:ethers.Contract|null,
    },
    account: string |null,
}

const Navbar: React.FC<navProps> = ({ state , account }) => {
    const [title, setTitle] = useState<string>("");
    const [owner, setOwner] = useState<string>('');
    const { contract } = state;

    const getDetails = async () => {
        const name:string = await contract?.name();
        setTitle(name);
        const owner:string = await contract?.owner();
        setOwner(owner.toLowerCase());
        console.log("owner:" , owner)

    }
    
    

    useEffect(() => {
        getDetails();
        
    },[contract])

  return (
    <div>
      <div className="bg-green-900 flex justify-around p-2">
        <h1 className="title text-white font-bold text-2xl shadow-2xl">
          {title}
        </h1>

        <input
          type="text"
          className="border-2 w-80 pl-3"
          placeholder="Search"
        />

        <button className="account hover:bg-orange-600 bg-orange-500 text-black font-semibold px-1">
          {" "}
          {`${account?.substring(0, 3)}... ${account?.substring(
            account.length - 3
          )} `}
        </button>
        {owner === account ? (
          <>
            <Link to={"/AddProduct"}>
              <button className="text-white mt-1 bg-slate-500 px-3  hover:bg-slate-600 font-serif">
                AddProduct +
              </button>
            </Link>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Navbar
