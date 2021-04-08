import React from 'react';
import { Grid, CircularProgress, } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { MOBILE_WIDTH } from './../../HelperFunctions';
import useHistoryCoinData from './../../api/HistoryCoinData';

const Graph = () => {
    const { id } = useParams();
    const { timestamp, prices, isLoading } = useHistoryCoinData(id)
    const mobile = useMediaQuery(MOBILE_WIDTH);

    return (
        <>
            {isLoading ?
                (
                    <Grid container justify="center" >
                        <Grid item>
                            <CircularProgress style={{ marginTop: '50px' }} />
                        </Grid>
                    </Grid>
                ) :
                (
                    mobile ?
                        (
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
                                />
                            </div>
                        ) :
                        (
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
                            />
                        )
                )}

        </>
    )
}

export default Graph
