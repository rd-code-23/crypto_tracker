import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { Line } from 'react-chartjs-2';
import { CoinWatchListContext } from './../../context/CoinWatchListContext.jsx';
import { useParams } from 'react-router';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { MOBILE_WIDTH } from './../../HelperFunctions';
import Moment from 'moment'
// https://github.com/adopted-ember-addons/ember-pikaday/issues/156
const Graph = ({ coin, isLoading }) => {

    const [data, setData] = useState({});
    const [timestamp, setTimestamp] = useState([]);
    const [prices, setPrices] = useState([]);
    const { currency } = useContext(CoinWatchListContext);
    const mobile = useMediaQuery("(max-width: 1290px)");

    //  console.log("Coin: ", coin.name);
    const { id } = useParams();

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
    // data.forEach(item => {
    //        console.log(item[0]);
    //     //    console.log(item[1]);
    //     setData  { x: item[0], y: item[1] }

    // })
    // const {day} = data;
    // console.log(prices);
    //console.log("Coin:", day[0].x);
    // console.log(timestamp);
    return (
        <>
            {mobile ? (
                <div style={{ minHeight: '40vh', maxHeight: '50vh' }}>
                    <Line
                        data={{
                            labels: timestamp,
                            datasets: [
                                {
                                    label: 'price',
                                    data: prices,
                                    borderWidth: 2,
                                    borderColor: "#606c38",
                                }
                            ]
                        }}
                        // width={900}
                        // height={900}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                xAxes: [{
                                    type: 'time',
                                    ticks: {
                                        autoSkip: true,
                                        maxTicksLimit: 5
                                    }
                                }]
                            },
                            elements: {
                                point: {
                                    radius: 0
                                }
                            }
                        }}
                    />    </div>) : (<Line
                        data={{
                            labels: timestamp,
                            datasets: [
                                {
                                    label: 'price',
                                    data: prices,
                                    borderWidth: 2,
                                    borderColor: "#606c38",
                                }
                            ]
                        }}
                        // height={400}
                        // width={10}
                        options={{
                            maintainAspectRatio: true,
                            scales: {
                                xAxes: [{
                                    type: 'time',
                                    ticks: {
                                        autoSkip: true,
                                        maxTicksLimit: 20
                                    }
                                }]
                            }
                        }}
                    />)}


        </>
    )
}

export default Graph
