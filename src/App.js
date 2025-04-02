import React, { useEffect, useState } from "react";


import "./App.css";
import CryptoList from "./components/CryptoList";
import Loader from "./components/Loader";

const PAGE_NUMBER = 1;
const limit = 10;


const App = () => {
    const [coinsData, setCoinsData] = useState([]);
    const [page, setPage] = useState(PAGE_NUMBER);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTimeout(async () => {
          
          try {
            const resPro = await fetch(
              `https://dummyjson.com/products?limit=${limit}&skip=${
                (page - 1) * limit
              }`
            );

            if(resPro.ok){
              const resData = await resPro.json();
              const newProduct = resData.products.map((each) => ({
                id: each.id,
                title: each.title,
                image : each.images[0],
                price: each.price
              }))
              setCoinsData((prev) => [...prev, ...newProduct]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }        
        }, 1500);
    }, [page]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = async () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            setLoading(true);
            setPage((prev) => prev + 1);
        }
    };

    return (
        <div className='app'>
            <h1>PRODUCTS</h1>
            <CryptoList coinsData={coinsData} />
            {loading && <Loader />}
        </div>
    );
};

export default App;
