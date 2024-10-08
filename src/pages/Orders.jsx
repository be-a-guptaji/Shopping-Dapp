import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

const Orders = () => {
  const wallet = useWallet();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (wallet.connected) {
      getOrders();
    }
  }, [wallet.connected]);

  const getOrders = async () => {
    try {
      const res = await fetch("http://localhost:8080/placedOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: wallet.publicKey.toString() }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await res.json();
      console.log(data);
      setOrders([...data]); // Assuming your API returns an orders array
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold my-4 text-center">Your Orders</h1>
      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {orders.length === 0 && !loading && <p>No orders found.</p>}
      {orders.length > 0 && (
        <div className="container mx-auto p-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
            >
              <h5 className="text-lg font-semibold text-gray-800">
                Product ID: {order._id}
              </h5>
              <div className="flex items-center justify-between">
                <div className="description">
                  <p className="text-gray-600">Product Name : {order.title}</p>
                  {/* <p className="text-gray-600">Quantity: {order.quantity}</p> */}
                  <p className="text-green-500 font-bold">
                    Price : {" "}
                    <span className="text-green-600">
                      {Math.round(order.price * 100 * 0.007) / 100}
                    </span>
                    <span className="text-green-600 font-normal"> SOL</span>
                  </p>
                </div>
                <div className=" aspect-square w-24">
                  <img src={order.image} alt="logo" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Orders;
