import { useEffect, useState } from 'react';
import { useProduct } from '../context/productsContext';
import { FaStar } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import MiniNav from './MiniNav';
import { Link } from 'react-router-dom';


interface CategoryState {
  id: string | null;
  name: string | null;
  price: number | null;
  description: string | null;
  category: string | null;
  image: string | null;
  ratings: number | null;
  stocks: number | null;
}

const ListProducts = () => {
  const { allItems } = useProduct();
  const [toys, setToys] = useState<CategoryState[]>();
  const[electronics , setElectronics]= useState<CategoryState[]>();
  const [fashion, setFashion] = useState<CategoryState[]>();
 

     const setItemsByCategory = () => {
       const toyItems = allItems.filter(
         (curval: CategoryState) => curval.category == "toy"
       );
       setToys(toyItems.slice(0, 3).reverse());

       const electronicsItems = allItems.filter(
         (curval: CategoryState) => curval.category == "electronics"
       );
       setElectronics(electronicsItems.slice(0, 3).reverse());

       const fashionItems = allItems.filter(
         (curval: CategoryState) => curval.category == "fashion"
       );
       setFashion(fashionItems.slice(0, 3).reverse());
     };

  useEffect(() => {
    if (allItems) setItemsByCategory();
  },[allItems])
  return (
    <div>
      <MiniNav />
      <div className="elect mt-9 w-[80%] mx-auto">
        <div className="heading border-b-2 border-black py-1 mb-2 flex justify-between">
          <h1 className="text-3xl  ">Electronics and Jwellerys</h1>
          <Link to={"/Category/?category=Electronics and Jwellerys"}>
            <button className="bg-green-700 px-3 hover:bg-green-900 cursor-pointer text-white">
              View All
            </button>
          </Link>
        </div>

        <ul className="flex justify-around ">
          {electronics?.map((curval: any, index: any) => {
            return (
              <li key={index} className="mx-auto shadow-sm p-3">
                <img src={curval.image} alt="" className="w-60 h-40" />

                <span className="flex  ml-3 w-60 text-lg gap-12">
                  <p className="text-xl font-sans">{curval.name}</p>
                  <p className=" flex text-lg">
                    {curval.ratings}
                    <FaStar className="mt-1 text-yellow-500" />
                  </p>
                </span>
                <Link to={`/SingleProduct/${curval.id}`}>
                <p className="flex cursor-pointer hover:text-blue-900 underline border-black  w-32 ml-auto">
                  view details <FaLongArrowAltRight className="mt-1" />
                </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="fashion mt-16 w-[80%] mx-auto">
        <div className="heading border-b-2 border-black py-1 mb-2 flex justify-between">
          <h1 className="text-3xl  ">Fashion and Design</h1>
          <Link to={"/Category/?category=Fashion and Design"}>
            <button className="bg-green-700 px-3 hover:bg-green-900 cursor-pointer text-white">
              View All
            </button>
          </Link>
        </div>

        <ul className="flex justify-around ">
          {fashion?.map((curval: any, index: any) => {
            return (
              <li key={index} className="mx-auto shadow-sm p-3">
                <img src={curval.image} alt="" className="w-60 h-40" />

                <span className="flex  ml-3 w-60 text-lg gap-12">
                  <p className="text-xl font-sans">{curval.name}</p>
                  <p className=" flex text-lg">
                    {curval.ratings}
                    <FaStar className="mt-1 text-yellow-500" />
                  </p>
                </span>

                <Link to={`/SingleProduct/${curval.id}`}>
                  <p className="flex cursor-pointer w-32 ml-auto hover:text-blue-900 underline border-black justify-end">
                    view details <FaLongArrowAltRight className="mt-1" />
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="toys mt-16 w-[80%] mx-auto">
        <div className="heading border-b-2 border-black py-1 mb-2 flex justify-between">
          <h1 className="text-3xl  ">Toys and Gaming</h1>
          <Link to={"/Category/?category=Toys and Gaming"}>
            

          <button className="bg-green-700 px-3 hover:bg-green-900 cursor-pointer text-white">
            View All
          </button>
          </Link>
        </div>

        <ul className="flex justify-around ">
          {toys?.map((curval: any, index: any) => {
            return (
              <li key={index} className="mx-auto shadow-sm p-3">
                <img src={curval.image} alt="" className="w-60 h-40" />

                <span className="flex  ml-3 w-60 text-lg gap-12">
                  <p className="text-xl font-sans">{curval.name}</p>
                  <p className=" flex text-lg">
                    {curval.ratings}
                    <FaStar className="mt-1 text-yellow-500" />
                  </p>
                </span>

                <Link to={`/SingleProduct/${curval.id}`}>
                <p className="flex cursor-pointer hover:text-blue-900 w-32 ml-auto underline border-black justify-end">
                  view details <FaLongArrowAltRight className="mt-1" />
                </p>
                </Link>
                
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ListProducts
