import { useEffect, useState } from "react";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Wallet from "./pages/Wallet";

function App() {
  const url = "https://fakestoreapi.com/products";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      async function fetchData() {
        setLoading(true);
        const urlData = await fetch(url);
        const data = await urlData.json();
        setData(data);
        setLoading(false);
      }
      fetchData();
    } catch (error) {
      console.log("error while fetching data",error);
    }
  }, []);
  return (
    <>
      <Navbar>
        <Routes>
          <Route path="/" element={<Home data={data} loading={loading} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </Navbar>
    </>
  );
}

export default App;
