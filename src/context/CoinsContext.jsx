import React, { createContext, useState, useEffect } from 'react';
import CoinGecko from 'coingecko-api'

export const CoinsContext = createContext();

export const CoinsContextProvider = props => {
    const [coins, setCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const CoinGeckoClient = new CoinGecko();

   
        useEffect(() => {
            const func = async () => {
                setIsLoading(true);
                try {
                    const res = await CoinGeckoClient.coins.markets({
                        per_page: 250
                    });
                 //   console.log(data);
                    setCoins(res.data);
                    setIsLoading(false);
                } catch (error) {
                    console.log(error);
                }
            };
            func()
    
        }, [])

 

    return (
        <CoinsContext.Provider value={{ coins, isLoading }}>
            {props.children}
        </CoinsContext.Provider>
    )
}