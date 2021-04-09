import React, { useContext, useEffect, useState } from 'react';
import { CoinWatchListContext } from './../context/CoinWatchListContext.jsx';
import axios from 'axios'

const useHistoryCoinData = (id) => {
    const { currency } = useContext(CoinWatchListContext);
    const [isLoading, setIsLoading] = useState(false);
    const [coinData, setCoinData] = useState({});

    const formatData = (data) => {
       return data.map(item => {
            return {
                x: item[0],
                y: item[1].toFixed(4),
            }
        })
    }

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
                    {
                        params: {
                            vs_currency: currency,
                            days: 1
                        }
                    })
               setCoinData({
                day: formatData(res.data.prices),
               });
                setIsLoading(false)
            } catch (error) {
                console.log(error);
            }
        }
        fetchApi();
    }, [currency])
    return { coinData, isLoading }
}
export default useHistoryCoinData