import React, { useContext } from 'react'
import { Grid, CircularProgress } from '@material-ui/core/';
import Detail from './Detail.jsx';
import { getCurrencySymbol } from './../../HelperFunctions.js';
import { CoinWatchListContext } from './../../context/CoinWatchListContext.jsx';
const Details = ({ coin, isLoading }) => {
    const { currency } = useContext(CoinWatchListContext);

    return (
        <div>
            <Grid container justify="center" alignItems="center" style={{ padding: '15px' }}>
                <Grid item xs={1}></Grid>

                {isLoading ?
                    (
                        <Grid container item justify="center" alignItems="center" >
                            <Grid item style={{ margin: '40px' }}>
                                <CircularProgress />
                            </Grid>
                        </Grid>
                    ) :
                    (
                        <Grid container direction="column" justify="space-between" item  lg={10} style={{ marginTop: '30px',padding: '10px' }}>
                            <Detail
                                category={'Price'}
                                value={`${getCurrencySymbol(currency)} ${coin.current_price}`}
                            />
                            <Detail
                                category={'Price Change (24)'}
                                value={coin.price_change_percentage_24h}
                                style={{ color: `${coin.price_change_percentage_24h < 0 ? 'red' : 'green'}` }}
                            />
                            <Detail
                                category={'Market Cap Rank'}
                                value={coin.market_cap_rank}
                            />
                            <Detail
                                category={'All Time High'}
                                value={`${getCurrencySymbol(currency)} ${coin.ath}`}
                            />
                            <Detail
                                category={'24h High/Low'}
                                value={` ${getCurrencySymbol(currency)}  ${coin.high_24h} / ${coin.low_24h}`}
                            />
                        </Grid>
                    )
                }



                <Grid item xs={1}></Grid>
            </Grid>
        </div>
    )
}

export default Details