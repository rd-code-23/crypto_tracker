import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography, IconButton, CircularProgress } from '@material-ui/core/';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { CoinWatchListContext } from '../../../context/CoinWatchListContext.jsx';
import { getCurrencySymbol } from '../../../HelperFunctions.js';
import { useHistory } from 'react-router-dom';
import useCoinData from '../../../api/CoinData.jsx';

const SmallCoinCard = ({ coin,unTrackCoin, currency }) => {
    const DETAIL_PAGE = `/coins/${coin.id}`;
    const { price, change24, isLoading } = useCoinData(coin);
    //const { unTrackCoin, currency } = useContext(CoinWatchListContext);
    const history = useHistory();

    const useStyles = makeStyles({
        root: {
            minWidth: '275px',
            maxHeight: '220px',
            cursor: 'pointer',
            padding: 0
        },
        symbol: {
            fontSize: '18px',
            fontFamily: 'Russo One',
            color: '#F1FAEE',
        },
        priceChangePercentage: {
            color: `${coin.price_change_percentage_24h < 0 ? 'red' : 'green'}`,
            fontFamily: 'Russo One'
        },
        currentPrice: {
            fontFamily: 'Russo One',
            color: '#F1FAEE',
            fontSize: '22px',
            marginTop: '15px',
        },
        logo: {
            width: '72px',
        },
        untrackButton: {
            padding: 5,
            margin: 0,
            color: '#8d0801',
        }
    });
    const classes = useStyles();

    const renderPage = () => {

        return (
            <div onClick={(e) => { e.stopPropagation(); history.push(DETAIL_PAGE) }}>
                <Card elevation={11} style={{ backgroundColor: '#212f45' }}>
                    <Grid container item justify="flex-end" alignItems="center">
                        <div onClick={(e) => { e.stopPropagation(); history.push('/') }}>
                            <Grid item  >
                                <IconButton aria-label="delete"
                                    className={classes.untrackButton}
                                    onClick={() => { unTrackCoin(coin.id) }}>
                                    <HighlightOffIcon />
                                </IconButton>
                            </Grid>
                        </div>
                    </Grid>

                    <CardContent style={{ padding: ' 0 50px 30px 50px' }}>
                        <Grid container item direction="column" justify="center" alignItems="center">
                            <Grid item className={classes.priceChangePercentage}>
                                {change24}%
                            </Grid>

                            <Grid item >
                                <Typography className={classes.symbol} gutterBottom>
                                    {coin.symbol.toUpperCase()}
                                </Typography>
                            </Grid>

                            <Grid item>
                                <img src={coin.image} className={classes.logo} alt="coin" />
                            </Grid>

                            <Grid item>
                                {isLoading ?
                                    (
                                        <Grid container justify="center" alignItems="center" >
                                            <Grid item>
                                                <CircularProgress />
                                            </Grid>
                                        </Grid>
                                    ) :
                                    (
                                        <Typography className={classes.currentPrice} gutterBottom>
                                            {getCurrencySymbol(currency)}{price.toLocaleString(undefined, { minimumFractionDigits: `${currency === 'btc' ? 7 : 2}` })}
                                        </Typography>
                                    )}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card >
            </div>
        )
    }

    return (
        <>
            {renderPage()}
        </>
    )
}

export default SmallCoinCard