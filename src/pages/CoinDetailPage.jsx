import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { useParams } from 'react-router'
import { makeStyles } from "@material-ui/core/styles";
import Coin from '../components/CoinDetailPage/Coin.jsx';
import Details from '../components/CoinDetailPage/Details.jsx';
import Header from './../components/Header.jsx';
import Graph from '../components/CoinDetailPage/Graph'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { MOBILE_WIDTH } from './../HelperFunctions';
import useCoinData from './../api/CoinData';

const CoinDetailPage = () => {
    const useStyles = makeStyles(theme => ({
        paper: {
            color: theme.palette.text.secondary,
            backgroundColor: "#212f45",
            opacity: '1',
            borderRadius: '10px'
        },
        mainContainer: {
            marginTop: '1%',
            maxWidth: '100vw'
        },
        coin: {
            padding: '20px'
        },
        // details: {
        //     padding: '10px'
        // },
        // graph: {
        //     width: '100%',
        //     height: '50vh'
        // }
    }));
    const classes = useStyles();

    const { id } = useParams();
    const mobile = useMediaQuery(MOBILE_WIDTH);
    const { coin, isLoading } = useCoinData(id)

    return (
        <>
            <Header />
            {mobile ?
                (
                    <Grid container spacing={1} justify="center" alignItems="center" className={`${classes.mainContainer} `} >
                        <Grid container direction="column" item xs={9} spacing={1} >
                            <Grid item>
                                <Paper className={`${classes.paper}  ${classes.coin}`}>
                                    <Coin coin={coin} />
                                </Paper>
                            </Grid>

                            <Grid item>
                                <Paper className={`${classes.paper}`}>
                                    <Details coin={coin} isLoading={isLoading} />
                                </Paper>
                            </Grid>

                        </Grid>
                        <Grid item xs={9}>
                            <Paper className={`${classes.paper}`} style={{ padding: '5px' }}>
                                <Graph />
                            </Paper>
                        </Grid>

                    </Grid>
                ) :
                (
                    <Grid container spacing={2} justify="center" alignItems="center" className={`${classes.mainContainer} `} >
                        <Grid container direction="column" item xs={4} spacing={1} >
                            <Grid item>
                                <Paper className={`${classes.paper}  ${classes.coin}`}>
                                    <Coin coin={coin} />
                                </Paper>
                            </Grid>

                            <Grid item >
                                <Paper className={`${classes.paper}`}>
                                    <Details coin={coin} isLoading={isLoading} />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid item xs={7} >
                            <Paper className={`${classes.paper}`} style={{ padding: '20px' }}>
                                <Graph />
                            </Paper>
                        </Grid>
                    </Grid>
                )
            }
        </>
    )
}

export default CoinDetailPage