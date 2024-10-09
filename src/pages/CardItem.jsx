import { MdOutlineDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import { toast } from "react-toastify";

export const CardItem = ({ item }) => {
  const dispatch = useDispatch();
  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.error("Item removed");
  };

  return (
    <div className="flex ">
      <div className="flex gap-10 py-4 border-b border-gray-300">
        <div className="">
          <img src={item.image} className="w-[200px]"></img>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold ">{item.title}</h1>
          <p className="">
            {item.description.split(" ").slice(0, 10).join(" ") + "..."}
          </p>
          <div className="font-extrabold  text-xl text-green-600">
            ${item.price}
          </div>
        </div>
        <div
          onClick={removeFromCart}
          className="flex mt-[80px] text-2xl justify-center items-center cursor-pointer rounded-full  "
        >
          <MdOutlineDelete />
        </div>
      </div>
      <hr className="" />
    </div>
  );
};