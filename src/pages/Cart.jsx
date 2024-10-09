import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import { toast } from "react-toastify";

export const Cart = () => {
  const { cart } = useSelector((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);
  const [items, setItems] = useState([]); // Changed from 'item' to 'items' for clarity
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.length > 0) {
      getItem();
    } else {
      setItems([]); // Reset items if cart is empty
    }
  }, [cart]);

  const getItem = async () => {
    try {
      const res = await fetch("http://localhost:8080/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      setItems(data.orders); // Set items directly
      setTotalAmount(data.orders.reduce((acc, curr) => acc + curr.price, 0));
    } catch (error) {
      console.error("Failed to fetch items:", error);
      toast.error("Failed to fetch items from cart");
    }
  };

  const removeFromCart = (id) => {
    dispatch(remove(id));
    toast.error("Item removed");
  };

  return (
    <div className="flex justify-center w-screen">
      {cart.length > 0 ? (
        <div className="md:flex gap-20">
          <div className="md:flex flex-col justify-between md:w-1/2 w-11/12 mx-auto gap-4 my-12">
            {items.map((item, index) => (
              <div className="flex" key={index}>
                <div className="flex gap-10 py-4 border-b border-gray-300 items-center">
                  <div>
                    <img src={item.image} alt="img" className="w-[200px]" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h1 className="text-xl font-bold">{item.title}</h1>
                    <p>
                      {item.description
                        ? item.description.split(" ").slice(0, 10).join(" ") +
                          "..."
                        : "No description available."}
                    </p>
                    <p className="text-green-500 text-xl">
                      Price :{" "}
                      <span className="text-green-600 font-medium">
                        {Math.round(totalAmount * 100 * 0.007) / 100}
                      </span>
                      <span className="text-green-600 font-normal"> SOL</span>
                    </p>
                  </div>
                  <div
                    onClick={() => removeFromCart(item._id)}
                    className="text-2xl cursor-pointer rounded-full"
                  >
                    <MdOutlineDelete />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="md:flex flex-col h-[80vh] justify-around">
            <div className="flex flex-col mt-16 gap-2">
              <h2 className="text-3xl text-green-600 font-bold text-center">
                Your Cart
              </h2>
              <h2 className="text-5xl text-green-800 font-semibold text-center">
                Summary
              </h2>
            </div>
            <div>
              <p className="text-black text-xl font-bold mt-5 text-center">
                <span>Total Items: {cart.length}</span>
              </p>
              <p className="text-black font-bold text-2xl text-center">
                Total Amount:{" "}
                <span className="text-green-600">
                  {Math.round(totalAmount * 100 * 0.007) / 100}
                </span>
                <span className="text-green-600 font-normal"> SOL</span>
              </p>
              <Link to={"/checkout"} className="md:ml-0 ml-[50%]">
                <button className="border border-green-600 px-16 rounded-md p-2 text-white bg-green-600 font-bold text-xl mt-6 md:ml-0 -translate-x-[50%] md:translate-x-0">
                  Checkout Now
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
