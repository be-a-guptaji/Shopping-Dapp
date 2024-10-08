import { Spinner } from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { add, remove } from "../redux/Slices/CartSlice";

export const Home = ({ data, loading }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart = (id) => {
    dispatch(add(id));
    toast.success("Item added to Cart");
  };

  const removeFromCart = (id) => {
    dispatch(remove(id));
    toast.success("Item removed from Cart");
  };

  const itemInCart = (id) => {
    return cart.some((p) => p === id);
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : data.length > 0 ? (
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh] mb-8">
          {data.map((card, index) => (
            <div
              key={card.id} // Ensure to provide a unique key
              className="flex flex-col items-center justify-between hover:scale-110 transition duration-300 ease-in gap-3 p-4 mt-10 rounded-xl ml-5 border border-black cursor-pointer"
            >
              <div>
                <p className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">
                  {card.title}
                </p>
              </div>
              <div className="h-[200px]">
                <img
                  src={card.image}
                  alt={card.title} // Add alt text for accessibility
                  className="h-full w-full object-cover"
                  onError={(e) =>
                    (e.target.src = "path/to/placeholder-image.png")
                  } // Fallback for broken images
                />
              </div>
              <div>
                <p className="w-40 text-gray-400 font-normal text-[10px] text-left">
                  {card.description.split(" ").slice(0, 10).join(" ") + "..."}
                </p>
              </div>
              <div className="flex justify-between gap-12 items-center w-full mt-5">
                <div className="text-green-500">
                    <span className="text-green-600">
                      {Math.round(card.price * 100 * 0.007) / 100}
                    </span>
                    <span className="text-green-600 font-normal"> SOL</span>
                </div>

                {itemInCart(card._id) ? (
                  <button
                    onClick={() => removeFromCart(card._id)}
                    className="text-gray-700 border-2 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
                  >
                    Remove Item
                  </button>
                ) : (
                  <button
                    onClick={() => addToCart(card._id)}
                    className="text-gray-700 border-2 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p>No Products Found</p>
        </div>
      )}
    </div>
  );
};

