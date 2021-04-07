import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import LargeCoinCard from './CoinCards/LargeCoinCard';
import SmallCoinCard from './CoinCards/SmallCoinCard';
import { CoinWatchListContext } from './../../context/CoinWatchListContext.jsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {MOBILE_WIDTH} from './../../HelperFunctions';

const CoinWatchListing = () => {
    const { coinWatchList,unTrackCoin, currency  } = useContext(CoinWatchListContext);

    const mobile = useMediaQuery(MOBILE_WIDTH);

    return (
        <>
            <Grid container spacing={2} style={{ marginTop: '50px', width: '80vw' }} justify={`${mobile ? ('center') : ('flex-start')}`} alignItems="center">
                {coinWatchList.map((coin, index) => {
                    return (
                        <Grid item key={coin.id} >
                            {mobile ?
                                (
                                <SmallCoinCard coin={coin} unTrackCoin={unTrackCoin} currency={currency} key={coin.id}/>
                                ) :
                                (
                                <LargeCoinCard coin={coin}  unTrackCoin={unTrackCoin} currency={currency} key={coin.id}/>
                                )
                            }
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

export default CoinWatchListing