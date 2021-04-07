import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const useAllCoinsData = (mountRef) => {
    const [coins, setCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            console.log("FETCHING ALL COINS");

            try {
                //not sure if this is correct way to check for mounted component
                if (mountRef) {
                    setIsLoading(true);
                    const res = await axios.get('https://rdmycorsproxy.herokuapp.com/https://api.coingecko.com/api/v3/coins/markets', {
                        params: {
                            vs_currency: "usd",
                            per_page: '250'
                        }
                    })
                    //console.log(res.data)
                    setCoins(res.data);

                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchApi();
        return () => {
            if (mountRef) {
                mountRef.current = false;
            }

        };

    }, []);

    return { isLoading, mountRef, coins }
}

export default useAllCoinsData