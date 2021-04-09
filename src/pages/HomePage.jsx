import React from 'react';
import { Grid, CircularProgress, } from '@material-ui/core';
import CoinWatchListing from '../components/HomePage/CoinWatchListing';
import TrackCoin from '../components/HomePage/TrackCoin.jsx';
import Header from './../components/Header.jsx';
import useAllCoinsData  from "./../api/AllCoinsData";

const HomePage = () => {
    const { isLoading } = useAllCoinsData()

    const renderPage = () => {
        if (isLoading) {
            return (
                <Grid container justify="center">
                    <Grid item>
                        <CircularProgress style={{ marginTop: '50px' }} />
                    </Grid>
                </Grid>
            )
        } else {
            return (
                <>
                    <Header />
                    <Grid container justify="center" alignContent="center" alignItems="center">
                        <Grid container justify="center" alignContent="center" alignItems="center">
                            <TrackCoin />
                        </Grid>
                        <CoinWatchListing />
                    </Grid >
                </>
            );
        }
    }
    return (
        <>
            {renderPage()}
        </>
    )
}

export default HomePage