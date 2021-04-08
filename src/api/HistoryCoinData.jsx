import React, { useContext, useEffect, useState } from 'react';
import { CoinWatchListContext } from './../context/CoinWatchListContext.jsx';
import axios from 'axios'
import Moment from 'moment'

const useHistoryCoinData = (id) => {

    const { currency } = useContext(CoinWatchListContext);
    const [timestamp, setTimestamp] = useState([]);
    const [prices, setPrices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const convertData = (data) => {
        data = data.filter((item, index) => (index % 2)); // remove some data points
        data = data.filter((item, index) => (!(index % 2))); // remove some data points

        let [d] = data.reduce((a, arr) => {
            arr.forEach((item) => {
                ("" + item).split(',').map(Number).forEach((num, i) => {
                    if (!a[i]) a[i] = [];
                    a[i].push(num);
                });
            });
            return a;
        }, []);

        setTimestamp(d.map(item => Moment(new Date(item)).format("M/D/YYYY, h:mm:ss a")).filter((item, index) => !(index % 2)));
        setPrices(d.filter((item, index) => index % 2));
    }
    useEffect(() => {
        const fetchApi = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(`https://rdmycorsproxy.herokuapp.com/https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
                    {
                        params: {
                            vs_currency: currency,
                            days: 1
                        }
                    })
                convertData(res.data.prices)
                setIsLoading(false)
            } catch (error) {
                console.log(error);
            }
        }
        fetchApi();
    }, [currency])
    return { timestamp, prices,isLoading }
}
export default useHistoryCoinData