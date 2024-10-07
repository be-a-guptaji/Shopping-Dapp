import { useEffect, useState } from "react";
import axios from 'axios';
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Wallet from "./pages/Wallet";
import CheckOut from "./pages/CheckOut";
import Orders from "./pages/Orders";

function App() {
  // const url = "https://fakestoreapi.com/products";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      async function fetchData() {
        setLoading(true);
        axios
          .get("http://localhost:8080")
          .then((newdata) => setData(newdata.data))
          .catch((err) => console.log(err));
        // axios.get('http://localhost:8080').then((newdata)=>setData(newdata.data)).catch((err)=>console.log(err))
        setLoading(false);
      }
      fetchData();
    } catch (error) {
      console.log("error while fetching data", error);
    }
  }, [data]);
  return (
    <>
      <Navbar>
        <Routes>
          <Route path="/" element={<Home data={data} loading={loading} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/order" element={<Orders />} />
        </Routes>
      </Navbar>
    </>
  );
}

export default App;
