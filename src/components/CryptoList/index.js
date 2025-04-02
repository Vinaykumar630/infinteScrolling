import React from "react";

import CryptoCard from "../CryptoCard";
import "./index.css";

const CryptoList = ({ coinsData }) => {
    return (
        <div className='crypto_list'>
            {coinsData.map((coin, index) => {
                return (
                    <CryptoCard
                        key={index}
                        image={coin.image}
                        name={coin.title}
                        price={coin.price}
                    />
                );
            })}
        </div>
    );
};

export default CryptoList;
