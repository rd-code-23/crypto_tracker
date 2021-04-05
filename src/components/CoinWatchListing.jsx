import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import CoinCard from './CoinCard.jsx';
import { CoinWatchListContext } from './../context/CoinWatchListContext.jsx';
import { Link } from 'react-router-dom';

const CoinWatchListing = () => {
    const { coinWatchList } = useContext(CoinWatchListContext);

    return (
        <>
            <Grid container spacing={2} style={{ marginTop: '50px', width: '80vw' }} justify="flex-start" alignItems="center">
                {coinWatchList.map((coin, index) => {
                    // here we can have a boolean value to determine if we want 
                    //display coins in a table or cards 
                    return (
                        <Grid item key={coin.id} >
                            {/* <Link to={`/crypto_tracker/coins/${coin.id}`} style={{textDecoration:'none'}}> */}
                            <CoinCard coin={coin} />
                            {/* </Link> */}
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

export default CoinWatchListing