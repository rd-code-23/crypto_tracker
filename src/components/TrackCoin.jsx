import React, { useContext, useState } from 'react';
import { Button, Grid } from '@material-ui/core/';
import { CoinWatchListContext } from './../context/CoinWatchListContext.jsx';
import SearchBox from './SearchBox.jsx';
import { makeStyles } from '@material-ui/core/styles';

const TrackCoin = () => {
    const useStyles = makeStyles({
        searchBox: {
            marginRight: '10px',
            width: '300px'
        },
        trackCoinBtn: {
            marginTop: '5px',
            padding: '10px',
            color: '#F1FAEE',
            backgroundColor: '#222531',
            '&:hover': {
                backgroundColor: '#222531',
                color: '#F1FAEE'
            }
        },
    });
    const classes = useStyles();

    const { trackCoin } = useContext(CoinWatchListContext);
    const [search, setSearch] = useState(null);

    return (
        <>
            <Grid item className={classes.searchBox}>
                <SearchBox setSearch={setSearch} />
            </Grid>

            <Grid item>
                <Button variant="contained" className={classes.trackCoinBtn}
                    onClick={() => trackCoin(search)}>Track coin</Button>
            </Grid>
        </>

    )
}

export default TrackCoin