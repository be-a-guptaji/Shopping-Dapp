// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { CardItem } from "./CardItem";

// export const Cart = () => {
//   const { cart } = useSelector((state) => state);
//   const [totalAmount, settotalAmount] = useState(0);

//   useEffect(() => {
//     settotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
//   }, [cart]);
  
//   return (
//     <div className="flex justify-between gap-7">
//       {cart.length > 0 ? (
//         <div className="flex justify-center w-full gap-[200px]">
//           <div className="flex flex-col justify-between w-1/4 gap-4 my-12">
//             {cart.map((item) => {
//               return <CardItem key={item.id} item={item} />;
//             })}
//           </div>
//           <div className="flex flex-col h-[80vh] justify-around">
//             <div className="flex  flex-col  mt-16 gap-2">
//               <h2 className="text-3xl text-green-600 font-bold">Your Cart</h2>
//               <h2 className="text-5xl text-green-800 font-semibold">Summary</h2>
//             </div>
//             <div>
//               <p className="text-black text-xl font-bold mt-5">
//                 <span className="">Total Items:{cart.length}</span>
//               </p>
//               <p className="text-black font-bold text-2xl">
//                 Total Amount : {" "}
//                 <span className="text-green-600">

//                   {Math.round(totalAmount * 100 * 0.0070) / 100}
//                 </span>
//                   <span className="text-green-600 font-normal"> SOL</span>
//               </p>
//               <Link to={"/checkout"}>
//               <button className="border border-green-600 px-16 rounded-md p-2 text-white bg-green-600 font-bold text-xl mt-6">
//                 Checkout Now{" "}
//               </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="flex justify-center flex-col items-center m-auto mt-[25vh]">
//           <h1 className="font-semibold text-3xl my-8">
//             <span className="text-green-600">Cart</span> is Empty
//           </h1>
//           <Link to={"/"}>
//             <button className="border border-green-500 text-2xl font-bold px-8 p-1 bg-green-500 text-white rounded-md mt-4">
//               Shop Now
//             </button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CardItem } from "./CardItem";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import { toast } from "react-toastify";

export const Cart = () => {
  const { cart } = useSelector((state) => state);
  const [totalAmount, settotalAmount] = useState(0);
  const [item, setitem] = useState([]);
  let orders = [];

  const dispatch = useDispatch();
  

  useEffect(() => {
    getItem();
  }, [cart]);
  
  const getItem = async () => {
    const res = await fetch("http://localhost:8080/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });
    //  item = await res.json();
    const data = await res.json();
    console.log(data.orders);
    orders=[...data.orders]
    setitem(...data.orders);
    console.log(item);
    settotalAmount(orders.reduce((acc, curr) => acc + curr.price, 0));
  };
  
   const removeFromCart = (id) => {
     dispatch(remove(id));
     toast.error("Item removed");
   };
  
  return (
    <div className="flex justify-between gap-7">
      {cart.length > 0 ? (
        <div className="flex justify-center w-full gap-[200px]">
          <div className="flex flex-col justify-between w-1/4 gap-4 my-12">
            {orders.map((item, index) => (
              <div className="flex" key={index}>
                {" "}
                {/* Use index directly as key */}
                <div className="flex gap-10 py-4 border-b border-gray-300">
                  <div>
                    <img src={item.image} alt="img" className="w-[200px]" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h1 className="text-xl font-bold">{item.title}</h1>
                    <p>
                      {/* Check if description is defined before splitting */}
                      {item.description
                        ? item.description.split(" ").slice(0, 10).join(" ") +
                          "..."
                        : "No description available."}
                    </p>
                    <div className="font-extrabold text-xl text-green-600">
                      ${item.price}
                    </div>
                  </div>
                  <div
                    onClick={() => removeFromCart(item._id)} // Assuming removeFromCart is defined
                    className="flex mt-[80px] text-2xl justify-center items-center cursor-pointer rounded-full"
                  >
                    <MdOutlineDelete />
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
          <div className="flex flex-col h-[80vh] justify-around">
            <div className="flex  flex-col  mt-16 gap-2">
              <h2 className="text-3xl text-green-600 font-bold">Your Cart</h2>
              <h2 className="text-5xl text-green-800 font-semibold">Summary</h2>
            </div>
            <div>
              <p className="text-black text-xl font-bold mt-5">
                <span className="">Total Items:{cart.length}</span>
              </p>
              <p className="text-black font-bold text-2xl">
                Total Amount :{" "}
                <span className="text-green-600">
                  {Math.round(totalAmount * 100 * 0.007) / 100}
                </span>
                <span className="text-green-600 font-normal"> SOL</span>
              </p>
              <Link to={"/checkout"}>
                <button className="border border-green-600 px-16 rounded-md p-2 text-white bg-green-600 font-bold text-xl mt-6">
                  Checkout Now{" "}
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center flex-col items-center m-auto mt-[25vh]">
          <h1 className="font-semibold text-3xl my-8">
            <span className="text-green-600">Cart</span> is Empty
          </h1>
          <Link to={"/"}>
            <button className="border border-green-500 text-2xl font-bold px-8 p-1 bg-green-500 text-white rounded-md mt-4">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
