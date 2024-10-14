import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'

interface listProps {
    state: {
        provider: ethers.BrowserProvider |null,
        signer: ethers.Signer |null,
        contract:ethers.Contract |null,
    }
}
const ListProducts: React.FC<listProps> = ({ state }) => {
  const [allItems, setAllItems] = useState<any[]>();
  const { contract } = state;

  const getAllItems = async() => {
   try {
     const rawResult = await contract?.getAllProducts()
           const parsedResult = rawResult.map((item: any) => ({
             id: item.id,
             name: item.name,
             price: Number(ethers.formatEther(item.price.toString())) / 2500,
             description: item.description,
             category: item.category,
             image: item.image,
             ratings: Number(item.ratings),
             stocks: Number(item.stocks),
           }));
       
    
     setAllItems(parsedResult);
   } catch (error) {
    console.log(error)
   }
 }
    


  useEffect(() => {
    getAllItems();
  }, [contract]);

  useEffect(() => {
    console.log(allItems)
  },[allItems])
  
  return (
    <div>
      <ul>
        {allItems?.map((curval, key) => {
          return (<>
            <img src={curval.image} alt="" />
            <p>{curval.name}</p>
            <p>{ curval.price }</p>
            <p>{ curval.description }</p>
            <p>{ curval.category }</p>
            <p>{ curval.stocks }</p>
            <p>{ curval.ratings }</p>
            
          </>)
        })}
      </ul>
    </div>
  )
}

export default ListProducts
