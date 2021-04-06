import React, { useContext } from 'react';
import { Grid, CircularProgress, } from '@material-ui/core';
import CoinWatchListing from '../components/CoinWatchListing.jsx';
import TrackCoin from '../components/TrackCoin.jsx';
import { CoinsContext } from './../context/CoinsContext.jsx';
import Header from './../components/Header.jsx';

const HomePage = () => {
    const { isLoading } = useContext(CoinsContext);
    console.log("homepage");

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