import { useSearchParams } from "react-router-dom";
import { useProduct } from "../context/productsContext";
import MiniNav from "../components/MiniNav";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";



const Category = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");
    const trimmedCategory = searchParams.get("category")?.trim();
    const { allItems } = useProduct();

     let filterData = allItems;

    if (trimmedCategory === "Electronics and Jwellerys") filterData = allItems.filter((all:any) => all.category == "electronics");

     if (trimmedCategory === "Fashion and Design")
       filterData = allItems.filter((all: any) => all.category == "fashion");

    if (trimmedCategory === "Toys and Gaming") filterData = allItems.filter((all: any) => all.category == "toy");
         
    
  return (
    <div>
      <MiniNav />
      <div className="elect mt-9 w-[80%] mx-auto">
        <div className="heading border-b-2 border-black py-1 mb-2 flex justify-between">
                  <h1 className="text-3xl  ">{ category }</h1>
        
        </div>

        <ul className="grid grid-cols-3 gap-7">
          {filterData?.map((curval: any, index: any) => {
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

                <p className="flex cursor-pointer hover:text-blue-900 underline border-black  w-32 ml-auto">
                  view details <FaLongArrowAltRight className="mt-1" />
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Category
