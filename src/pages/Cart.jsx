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

export const Cart = () => {
  const { cart } = useSelector((state) => state);
  const [totalAmount, settotalAmount] = useState(0);

  useEffect(() => {
    settotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);
  
  return (
    <div className="flex justify-between gap-7">
      {cart.length > 0 ? (
        <div className="flex justify-center w-full gap-[200px]">
          <div className="flex flex-col justify-between w-1/4 gap-4 my-12">
            {cart.map((item) => {
              return <CardItem key={item.id} item={item} />;
            })}
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
                Total Amount : {" "}
                <span className="text-green-600">

                  {Math.round(totalAmount * 100 * 0.0070) / 100}
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
