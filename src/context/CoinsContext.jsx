import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CoinsContext = createContext();

export const CoinsContextProvider = props => {
    const [coins, setCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                   
                    params: {  
                        vs_currency: "usd",
                        per_page: '250'
                    }
                })
                //console.log(res.data)
                setCoins(res.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchApi();

    }, [])

    return (
        <CoinsContext.Provider value={{ coins, isLoading }}>
            {props.children}
        </CoinsContext.Provider>
    )
}