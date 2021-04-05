import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardActions, CardContent, Typography, IconButton } from '@material-ui/core/';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { CoinWatchListContext } from './../context/CoinWatchListContext.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getCurrencySymbol } from './../HelperFunctions.js'

const CoinCard = ({ coin }) => {
    const DETAIL_PAGE = `/crypto_tracker/coins/${coin.id}`
    const [isHover, setIsHover] = useState(false);
    const [price, setPrice] = useState(0);
    const [change24, setChange24] = useState(0);
    const { unTrackCoin, currency } = useContext(CoinWatchListContext);

    const useStyles = makeStyles({
        root: {
            minWidth: '275px',
            maxHeight: '220px',
        },
        symbol: {
            fontSize: '18px',
            fontFamily: 'Russo One',
            color: '#F1FAEE',
            marginRight: '30px',
        },
        priceChangePercentage: {
            padding: '5px',
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
            padding: 0,
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
                const res = await axios.get('https://rdmycorsproxy.herokuapp.com/https://api.coingecko.com/api/v3/coins/markets', {
                    params: {
                        vs_currency: currency,
                        ids: coin.id,
                    }
                })
                setPrice(res.data[0]["current_price"]);
                setChange24(res.data[0]["price_change_percentage_24h"]);
            } catch (error) {
                console.log(error);
            }
        }
        fetchApi()
        const intervalId = setInterval(() => { fetchApi() }, 2500)
        return () => {
            clearInterval(intervalId)
        }
    }, [currency,coin.id])

    return ( //212f45 252422 333533
        <Card className={classes.root} elevation={11} style={{ backgroundColor: '#212f45' }}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}>
            <CardContent className={classes.cardHover} style={{ padding: 0 }} >
                <Grid container direction="column" justify="center" alignItems="flex-start">

                    <Grid item container direction="row" justify="space-between" alignItems="flex-start" style={{ padding: '5px' }}>
                        <Grid item>

                            <Grid item container justify="center" alignItems="center" style={{ padding: '5px' }}>
                                <Link to={DETAIL_PAGE} style={{ textDecoration: 'none' }}> <Grid item>
                                    <img src={coin.image} className={classes.logo} alt="coin" />
                                </Grid>
                                </Link>
                                <Link to={DETAIL_PAGE} style={{ textDecoration: 'underline' }}>
                                    <Grid item >
                                        <Typography className={classes.symbol} gutterBottom>
                                            {coin.symbol.toUpperCase()}
                                        </Typography>
                                    </Grid>
                                </Link>
                            </Grid>

                        </Grid>

                        <Grid item>
                            <Grid item container justify="center" alignItems="center" spacing={1}>
                                <Link to={DETAIL_PAGE} style={{ textDecoration: 'none' }}>
                                    <Grid item className={classes.priceChangePercentage}>
                                        {change24}%
                                </Grid>
                                </Link>
                                <Grid item  >
                                    <IconButton aria-label="delete"
                                        className={classes.untrackButton}
                                        onClick={() => unTrackCoin(coin.id)}>
                                        <HighlightOffIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Link to={DETAIL_PAGE} style={{ textDecoration: 'none' }}>
                        <Grid item>
                            <Typography className={classes.currentPrice} gutterBottom>
                                {getCurrencySymbol(currency)}{price.toLocaleString(undefined, { minimumFractionDigits: `${currency === 'btc' ? 7 : 2}` })}
                            </Typography>
                        </Grid>
                    </Link>

                </Grid>
            </CardContent>
        </Card >
    )
}

export default CoinCard