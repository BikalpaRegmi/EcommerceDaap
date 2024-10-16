import React, { useState } from "react";
import { useEthereum } from "../context/EthereumContext";
import { ethers } from "ethers";



interface addDetail {
    id: string |null, 
    name: string |null,
    price: number |null,
    description: string |null,
    category: string |null,
    image: string |null,
    ratings: number |null,
    stocks:number |null,
}

const AddProducts = () => {
    const [details, setDetails] = useState<addDetail>({
      id: Date.now().toString(),
      name: null,
      price: null,
      description: null,
        category: null,
        image: null,
        ratings: null,
      stocks:null,
    });

    const { contract } = useEthereum();

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
        setDetails((prev) => ({
           ...prev , [e.target.name] : e.target.value 
       }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (contract) {
        
        const productDetails = {
          id: details.id,
          name: details.name,
          price: details.price ,
          description: details.description,
          category: details.category,
          image: details.image,
          ratings: details.ratings,
          stocks: details.stocks,

        };
        try {
          
          
          const transaction = await contract?.listProducts(
            productDetails.id,
            productDetails.name,
           productDetails.price!==null && ethers.parseEther(productDetails.price.toString()),
            productDetails.description,
            productDetails.category,
            productDetails.image,
            productDetails.ratings,
            productDetails.stocks,
            
           
          );
          await transaction.wait();
          alert('Added product  sucessfully');
          window.location.href = '/';
          
        } catch (error) {
          console.log(error)
        }
        
      }
    }
  const handleWithraw = async () => {
    if (contract) {
     const Transaction =  await contract?.withdraw();
      await Transaction.wait();
      alert('Withdraw sucessful');
      window.location.reload();
    }
 }
    

  return (
    <div className=" mt-9 ">
      <h1 className="text-center shadow-xl bg-green-700 w-96 mx-auto text-xl text-white">
        Create a product
      </h1>
      <form
        action=""
              className="text-xl shadow-lg  bg-slate-100 p-4 w-96 flex flex-col mx-auto"
              onSubmit={handleSubmit}
      >
        <p className="flex justify-between mb-2">
          <label htmlFor="">Name:</label>
          <input
            type="text"
            name="name"
            value={details.name || ""}
            onChange={handleChange}
            className="border-2"
          />
        </p>

        <p className="flex justify-between mb-2">
          <label>Price on Eth:</label>
          <input
            type="number"
            name="price"
            value={details.price || ""}
            onChange={handleChange}
            className="border-2"
          />
        </p>

        <p className="flex justify-between mb-2">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={details.description || ""}
            onChange={handleChange}
            className="border-2"
          />
        </p>

        <p className="flex justify-between mb-3">
          <label>Category:</label>
          <select name="category" value={details.category || ""} onChange={handleChange}>
            <option value=""> Select one</option>
            <option value="fashion"> Fashion and Design </option>
            <option value="electronics"> Electronics and Jwellery</option>
            <option value="toy"> Toy and Gaming</option>
          </select>
        </p>

        <p className="flex justify-between mb-2">
          <label>Image:</label>
          <input
            type="text"
            name="image"
            value={details.image || '' }
            onChange={handleChange}
            className="border-2"
          />
        </p>

        <p className="flex justify-between mb-2">
          <label>Ratings:</label>
          <input
            type="number"
            name="ratings"
            value={details.ratings || ""}
            onChange={handleChange}
            className="border-2"
          />
        </p>

        <p className="flex justify-between mb-2">
          <label>Stocks:</label>
          <input
            type="text"
            name="stocks"
            value={details.stocks || ""}
            onChange={handleChange}
            className="border-2"
          />
        </p>
        <button
          type="submit"
          className="bg-lime-700 text-white text-xl mt-5 w-48 ml-[49%] hover:bg-blue-300"
        >
          Submit
        </button>
      </form>
      <button className="bg-purple-700 text-white p-2 ml-[53%] mt-4 " onClick={handleWithraw}>WithDraw All Money</button>
      <h1 className="capitalize text-center text-5xl mt-12 font-bold ">this can only be accessed if you are owner !</h1>
    </div>
  );
}

export default AddProducts
