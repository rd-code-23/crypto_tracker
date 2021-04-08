import React, { useContext, useEffect, useState } from 'react';
import { CoinWatchListContext } from './../context/CoinWatchListContext.jsx';
import axios from 'axios'
import Moment from 'moment'

const useHistoryCoinData = (id) => {

    const { currency } = useContext(CoinWatchListContext);
    const [data, setData] = useState({});
    const [timestamp, setTimestamp] = useState([]);
    const [prices, setPrices] = useState([]);

    //  console.log("Coin: ", coin.name);


    //let prices = [];
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
        // setTimestamp(d.map(item => new Date(item).toLocaleString([], { hour12: true })).filter((item, index) => !(index % 2)))
        setTimestamp(d.map(item => Moment(new Date(item)).format("M/D/YYYY, h:mm:ss a")).filter((item, index) => !(index % 2)))
        setPrices(d.filter((item, index) => index % 2))


    }
    useEffect(() => {
        const fetchApi = async () => {
            // setIsLoading(true);
            try {

                const res = await axios.get(`https://rdmycorsproxy.herokuapp.com/https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
                    {
                        params: {
                            vs_currency: currency,
                            days: 1

                        }
                    })
                //  console.log(res.data.prices);
                //console.log(res.data)
                // res.data.prices.map(item => {
                //  console.log(item[0]);
                //  console.log(item[1]);
                //     setData(...data, { x: item[0], y: item[1] })

                //   })
                setData({
                    day: convertData(res.data.prices)
                });
                //setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }


        fetchApi();

    }, [currency])
    return { timestamp, prices }
}
export default useHistoryCoinData