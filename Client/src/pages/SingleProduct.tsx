import { Link, useParams } from "react-router-dom";
import { useProduct } from "../context/productsContext"
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";



const SingleProduct = () => {
    const [item, setItem] = useState<any>({});
    const { getSingleItem } = useProduct();
    const { id } = useParams();

    useEffect(() => {
        const fetchAItem =async () => {
            
            if (id) {
                const data = await getSingleItem(id);
                setItem(data);
            }
        }
        fetchAItem()
    },[getSingleItem])
  return (
    <div>
      <div className="bg-red-700 w-0" title="Go Back">
        <Link to={"/"} className="">
          <FaRegArrowAltCircleLeft className="text-3xl hover:text-purple-700 ml-16  text-green-700  mt-3" />
        </Link>
      </div>

      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest"></h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                {item.name}
              </h1>
              <div className="flex mb-4">
                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                  Description
                </a>
              </div>
              <p className="leading-relaxed mb-4">{item.description}</p>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Category</span>
                <span className="ml-auto capitalize text-gray-900">
                  {item.category}
                </span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Ratings</span>
                <span className="ml-auto text-gray-900">{item.ratings} </span>
                <FaStar className="mt-1 text-yellow-500" />
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">Available</span>
                <span className="ml-auto text-gray-900">{item.stocks}</span>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  {item.price} Eth
                </span>
                <button className="flex ml-auto text-white bg-green-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Buy Product
                </button>
              </div>
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-72 object-cover object-center rounded"
              src={item.image}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default SingleProduct
