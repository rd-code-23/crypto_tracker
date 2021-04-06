import React from 'react';
import { Typography, Grid } from '@material-ui/core/';

const Coin = ({ coin }) => {
    return (
        <>
            <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
                <Grid container item direction="column" justify="center" alignItems="center" >
                    <Grid item>
                        <Typography variant="h3" style={{ textAlign: 'center' }}>
                            {coin.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <img src={coin.image} style={{ height: '100px' }} alt="coin" />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Coin