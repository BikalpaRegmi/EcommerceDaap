import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useEthereum } from "./EthereumContext";
import { ethers } from "ethers";

interface Product {
  id: string |null;
  name: string |null;
  price: number |null|string;
  description: string |null;
  category: string |null;
  image: string |null;
  ratings: number |null;
  stocks:number |null,
}

interface productContextType {
  allItems: Product[] | null;
  getSingleItem:(id:string)=>Promise <Product | null>
}

interface productContextProviderProps{
children:ReactNode,
}

const productContext = createContext<productContextType | undefined>(undefined);

export const ProductContextProvider = ({ children }: productContextProviderProps) => {
    const [allItems, setAllItems] = useState<Product[] | null>(null);

    const { contract } = useEthereum();

    const getAllProducts = async () => {
        const rawResults:any = await contract?.getAllProducts();

        const parsedResults: Product[] = await rawResults.map(
          (curval: Product) => ({
            id: curval.id,
            name: curval.name,
            price:
              curval.price != null
                ? parseFloat(ethers.formatEther(curval.price.toString())) *
                  400000000000000.0
                : "",
            description: curval.description,
            category: curval.category,
            image: curval.image,
            ratings: Number(curval.ratings),
            stocks: Number(curval.stocks),
          })
        );
        setAllItems(parsedResults);
    }
  
  const getSingleItem = async(id:string) => {
    const getItem: any = await contract?.allItems(id);
    const parsedItem: Product = {
      id: getItem.id,
      name: getItem.name,
      price:
        getItem.price != null && getItem.price!=String
          ? parseFloat(ethers.formatEther(getItem.price.toString())) *
            400000000000000.0
          : "",
      description: getItem.description,
      category: getItem.category,
      image: getItem.image,
      ratings: Number(getItem.ratings),
      stocks: Number(getItem.stocks),
    };
 
    return parsedItem;
    
    }

    useEffect(() => {
      if (contract) {
        getAllProducts();
      }
    },[contract])
    
    return (<>
        <productContext.Provider value={{allItems , getSingleItem}}>
            {children}
    </productContext.Provider>
    </>)
}

export const useProduct = () => {
    const context: any = useContext(productContext);
    if (!context) throw new Error("plz wrap children on productContextProvider");
    return context;
}