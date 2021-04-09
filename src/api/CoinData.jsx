import React, { useContext, useEffect, useState } from 'react';
import { CoinWatchListContext } from './../context/CoinWatchListContext.jsx';
import axios from 'axios'

const useCoinData = (id) => {
    const [coin, setCoin] = useState('');
    const [price, setPrice] = useState(0);
    const [change24, setChange24] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { currency } = useContext(CoinWatchListContext);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setIsLoading(true)
                const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                    params: {
                        vs_currency: currency,
                        ids: id,
                    }
                })
                setCoin(res.data[0])
                setPrice(res.data[0]["current_price"]);
                setChange24(res.data[0]["price_change_percentage_24h"]);
                setIsLoading(false)
            } catch (error) {
                console.log(error);
            }
        }
        fetchApi();

        const intervalId = setInterval(() => { fetchApi() }, 45000)
        return () => {
            clearInterval(intervalId)
        }
    }, [currency, id])
    return { coin, price, change24, isLoading }
}

export default useCoinData