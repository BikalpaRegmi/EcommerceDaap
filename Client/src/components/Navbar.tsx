import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useEthereum } from '../context/EthereumContext';



const Navbar= () => {
    const [title, setTitle] = useState<string>("");
    const [owner, setOwner] = useState<string>('');
    const { contract , account } = useEthereum();

    const getDetails = async () => {
        const name:string = await contract?.name();
        setTitle(name);
        const owner:string = await contract?.owner();
      setOwner(owner.toLowerCase());
      

    }
    
    

  useEffect(() => {
    if(contract)
        getDetails(); 
    },[contract])

  return (
    <div>
      <div className="bg-green-900 flex justify-around p-2">
        <h1 className="title  text-white font-bold text-2xl shadow-2xl">
          <Link to={"/"}>{title}</Link>
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
