import { useEffect, useState } from "react";
import { useEthereum } from "../context/EthereumContext";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

interface ProductState {
  id: string | null;
  name: string | null;
  price: number | null | string;
  description: string | null;
  category: string | null;
  image: string | null ;
  ratings: number | null;
  stocks: number | null;
}

interface OrderState {
  timestamp: number;
  item: ProductState;
}

const OrderHistory = () => {
  const { contract } = useEthereum();

  const [orders, setOrders] = useState<OrderState[]>([]);

  const getMyOrder = async () => {
    try {
      const myOrders:any = await contract?.getMyOrders();
        setOrders(myOrders); 
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (contract) getMyOrder();
  }, [contract]);

  return (
      <div>
          <h1 className="text-3xl text-center my-5">Your Orders are on the way !</h1>
      <ul className="grid grid-cols-3 gap-7">
              {orders.map((order: OrderState, index: number) => {
          const {
              id, name, image, ratings 
          } = order.item; 
          return (
            <li key={index} className="mx-auto shadow-sm p-3">
              <img src={image || ''}  className="w-60 h-40" />
              <span className="flex ml-3 w-60 text-lg gap-12">
                <p className="text-xl font-sans">{name}</p>
                <p className="flex text-lg">
                  {Number(ratings)}
                  <FaStar className="mt-1 text-yellow-500" />
                </p>
                  </span>
                  
                  <Link to={`/SingleProduct/${id}`}>
                      <p>Purchased on {new Date (Number(order.timestamp ) *1000).toLocaleString()} </p>
                <p className="flex cursor-pointer hover:text-blue-900 underline border-black w-32 ml-auto">
                  view details <FaLongArrowAltRight className="mt-1" />
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrderHistory;
