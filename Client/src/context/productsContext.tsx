// ProductContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useEthereum } from "./EthereumContext"; 

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  ratings: number;
  stocks: number;
}

interface ProductContextType {
  allItems: Product[] | null;
  getAllProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allItems, setAllItems] = useState<Product[] | null>(null);
  const { contract } = useEthereum(); // Access contract from Ethereum context

  const getAllProducts = async () => {
    if (contract) {
      try {
        const rawResult = await contract.getAllProducts();
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
        console.error("Error fetching products:", error);
      }
    }
  };

  useEffect(() => {
    getAllProducts(); // Fetch products on mount
  }, [contract]);

  return (
    <ProductContext.Provider value={{ allItems, getAllProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
