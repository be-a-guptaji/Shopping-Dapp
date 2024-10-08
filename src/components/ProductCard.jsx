import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { add, remove } from "../redux/Slices/CartSlice";
export const ProductCard = ({ card }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(add(card));
    toast.success("Item added to Cart");
  };
  const removeFromCart = () => {
    dispatch(remove(card.id));
    toast.success("Item removed from Cart");
  };

  return (
    <div
      className=" flex flex-col items-center justify-between hover:scale-110 transition duration-300 ease-in gap-3 p-4 mt-10 rounded-xl ml-5 border border-black cursor-pointer"
    >
      <div>
        <p className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">
          {card.title}
        </p>
      </div>
      <div className="h-[200px]">
        <img src={card.image} className="h-full w-full" />
      </div>
      <div>
        <p className="w-40  text-gray-400 font-normal text-[13px] text-left">
          {card.description.split(" ").slice(0, 10).join(" ") + "..."}
        </p>
      </div>
      <div className="flex justify-between gap-12 items-center w-full mt-5">
        <div>
          <p className="text-green-600 font-semibold">${card.price}</p>
        </div>

        {cart.some((p) => p.id == card.id) ? (
          <button
            onClick={removeFromCart}
            className="text-gray-700 border-2 rounded-full font-semibold
        text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
          >
            Remove Item
          </button>
        ) : (
          <button
            onClick={addToCart}
            className="text-gray-700 border-2 rounded-full font-semibold
        text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};
