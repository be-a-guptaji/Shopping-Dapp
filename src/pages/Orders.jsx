// import { useWallet } from "@solana/wallet-adapter-react";
// import { useEffect } from "react";

// const Orders = () => {
//   const wallet = useWallet();

//   useEffect(() => {
//       getOrder();
//     }, []);
    
//     const getOrder = async () => {
//     //   console.log(wallet.publicKey.toString());
//     const res = await fetch("http://localhost:8080/placedOrder", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ user: wallet.publicKey.toString() }),
//     });
//     const data = await res.json();
//     console.log(data);
//   };
//   return (
//     <>
//       <h1>Orders</h1>
//     </>
//   );
// };

// export default Orders;
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
      setOrders(data.orders || []); // Assuming your API returns an orders array
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Your Orders</h1>
      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {orders.length === 0 && !loading && <p>No orders found.</p>}
      {orders.length > 0 && (
        <div>
          {orders.map((order, index) => (
            <div key={index} className="border-b py-2">
              <h2 className="text-xl">Order #{index + 1}</h2>
              {/* Adjust this according to your order structure */}
              <p>Total: {order.total} SOL</p>
              <p>Status: {order.status}</p>
              <p>Items:</p>
              <ul>
                {order.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {item.title} - {item.quantity} x ${item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Orders;
