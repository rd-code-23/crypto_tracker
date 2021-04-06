import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardActions, CardContent, Typography, IconButton, CircularProgress } from '@material-ui/core/';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { CoinWatchListContext } from './../context/CoinWatchListContext.jsx';
import axios from 'axios';
import { getCurrencySymbol } from './../HelperFunctions.js';
import { useHistory } from 'react-router-dom';

const CoinCard = ({ coin }) => {
    const DETAIL_PAGE = `/coins/${coin.id}`
    const [isHover, setIsHover] = useState(false);
    const [price, setPrice] = useState(0);
    const [change24, setChange24] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { unTrackCoin, currency } = useContext(CoinWatchListContext);
    const history = useHistory()

    const useStyles = makeStyles({
        root: {
            minWidth: '275px',
            maxHeight: '220px',
            cursor: 'pointer'
        },
        symbol: {
            fontSize: '18px',
            fontFamily: 'Russo One',
            color: '#F1FAEE',
            marginRight: '30px',
        },
        priceChangePercentage: {
            // padding: '5px',
            // marginLeft: '30px',
            color: `${coin.price_change_percentage_24h < 0 ? 'red' : 'green'}`,
            fontFamily: 'Russo One'
        },
        currentPrice: {
            fontFamily: 'Russo One',
            color: '#F1FAEE',
            fontSize: '48px',
            marginRight: '62px',
            marginTop: '30px',
            marginLeft: '10px',
        },
        logo: {
            width: '30px',
            marginRight: '5px',
        },
        untrackButton: {
            padding: 5,
            margin: 0,
            color: '#8d0801',
            visibility: `${isHover ? 'visible' : 'hidden'}`,
            position: `${isHover ? 'relative' : 'absolute'}`
        }
    });
    const classes = useStyles();

    const onMouseOver = () => setIsHover(true);
    const onMouseOut = () => setIsHover(false);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setIsLoading(true)
                const res = await axios.get('https://rdmycorsproxy.herokuapp.com/https://api.coingecko.com/api/v3/coins/markets', {
                    params: {
                        vs_currency: currency,
                        ids: coin.id,
                    }
                })
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
    }, [currency, coin.id])

    const renderPage = () => {

        return (
            <div onClick={(e) => { e.stopPropagation(); history.push(DETAIL_PAGE) }}>
                <Card className={classes.root} elevation={11} style={{ backgroundColor: '#212f45' }}
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOut}>
                    <CardContent className={classes.cardHover} style={{ padding: 0 }} >
                        <Grid container direction="column" justify="center" alignItems="flex-start">

                            <Grid item container direction="row" justify="space-between" alignItems="flex-start" style={{ padding: '5px' }}>
                                <Grid item>
                                    <Grid item container justify="center" alignItems="center" style={{ padding: '5px' }}>
                                        <Grid item>
                                            <img src={coin.image} className={classes.logo} alt="coin" />
                                        </Grid>
                                        <Grid item >
                                            <Typography className={classes.symbol} gutterBottom>
                                                {coin.symbol.toUpperCase()}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item>
                                    <Grid item container justify="center" alignItems="center" spacing={1}>
                                        <Grid item className={classes.priceChangePercentage}>
                                            {change24}%
                                             </Grid>

                                        <div onClick={(e) => { e.stopPropagation(); history.push('/') }}>
                                            <Grid item style={{ zIndex: 1 }} >
                                                <IconButton aria-label="delete" style={{ zIndex: 1 }}
                                                    className={classes.untrackButton}
                                                    onClick={() => { unTrackCoin(coin.id) }}>
                                                    <HighlightOffIcon style={{ zIndex: 1 }} />
                                                </IconButton>
                                            </Grid>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item>
                                {isLoading ?
                                    (
                                        <Grid container justify="center" alignItems="center" >
                                            <Grid item style={{ margin: '40px' }}>
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

    return ( //212f45 252422 333533
        <>
            {renderPage()}
        </>
    )
}

export default CoinCard