import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { Line } from 'react-chartjs-2';
import { CoinWatchListContext } from './../../context/CoinWatchListContext.jsx';
import { useParams } from 'react-router';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { MOBILE_WIDTH } from './../../HelperFunctions';
import useHistoryCoinData from './../../api/HistoryCoinData';

// https://github.com/adopted-ember-addons/ember-pikaday/issues/156
const Graph = ({ coin }) => {
    const { id } = useParams();
    const { timestamp, prices } = useHistoryCoinData(id)
    console.log(timestamp);
    const mobile = useMediaQuery(MOBILE_WIDTH);

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
