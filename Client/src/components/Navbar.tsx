import  { useEffect, useState } from 'react'
import { useEthereum } from '../context/EthereumContext';
import { useProduct } from '../context/productsContext';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modals/Modals';



const Navbar= () => {
    const [title, setTitle] = useState<string>("");
  const [owner, setOwner] = useState<string>('');
  const [search, setSearch] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false);
  const { contract, account , setState } = useEthereum();

  const { allItems } = useProduct();
  const navigate = useNavigate();

    const getDetails = async () => {
        const name:string = await contract?.name();
        setTitle(name);
        const owner:string = await contract?.owner();
      setOwner(owner.toLowerCase());
    }
  
    
    
   
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }
  
  const handleSearch = (id:string) => {
    navigate(`/SingleProduct/${id}`);
    setSearch("")
  } 

  const handleConnect = async () => {
    if (typeof window.ethereum !== "undefined") {
      const ethereum  = window.ethereum
      try {
        const account = await ethereum.request({ method: "eth_requestAccounts" });

        setState((prev) => ({
          ...prev, account: account[0],
        }));
        window.location.reload();
      } catch (error) {
        console.log(error)
      }
    } else {
      window.open("https://metamask.io/download/");
    }
  }
  
  
  useEffect(() => {
    if (contract)
      getDetails();
  }, [contract]);
  return (
    <div>
      <div className="bg-green-900 flex justify-around p-2">
        <h1 className="title  text-white font-bold text-2xl shadow-2xl">
          <Link to={"/"}>{title}</Link>
        </h1>
        <div className="">
          <input
            type="text"
            className="border-2 w-80 pl-3"
            placeholder="Search"
            value={search}
            onChange={handleChange}
          />

          <div className="AllResults absolute">
            {search.length > 0 &&
              allItems
                .filter((item: any) =>
                  item.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((curval: any) => {
                  return (
                    <div
                      onClick={() => handleSearch(curval.id)}
                      className="result px-2 w-80 bg-white  flex justify-around border-b-4 cursor-pointer hover:bg-slate-100"
                    >
                      <img src={curval.image} alt="" className="h-9 w-12" />
                      <p className="mt-1 font-bold">{curval.name}</p>
                      <p className="mt-1 font-light text-green-900">
                        {curval.price} eth
                      </p>
                    </div>
                  );
                })}
          </div>
        </div>
        {account ? (
          <>
            <button
              onClick={() => setOpen(true)}
              className="account hover:bg-orange-600 bg-orange-500 text-black font-semibold px-1"
            >
              {account.substring(0, 3)}... $
              {account.substring(account.length - 3)} 
            </button>{" "}
          </>
        ) : (
          <>
            <button
              onClick={handleConnect}
              className="account hover:bg-orange-600 bg-orange-500 text-black font-semibold px-1"
            >
              Plz connect MetaMask
            </button>
            
          </>
        )}
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="text-center w-56">
            <div className="mx-auto my-4 w-48">
              <h3 className="text-lg font-black text-orange-700">
                Confirm Disconnect
              </h3>
              <p className="text-sm text-gray-500">
                Are you sure you want to disconnect account{" "}
                {`${account?.substring(0, 3)}...${account?.substring(
                  account.length - 3
                )}`}{" "}
                <b>?</b>
              </p>
            </div>
            <div className="flex gap-4">
              <button
                className="btn btn-danger hover:bg-slate-50 text-red-700 font-bold w-full"
                onClick={() => {
                  navigate("/Disconnect");
                  setOpen(false);
                }}
              >
                Disconnect
              </button>
              <button
                className="btn font-semibold hover:bg-slate-50 text-green-600 btn-light w-full"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
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

  export default Navbar;
