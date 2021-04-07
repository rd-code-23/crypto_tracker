import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Typography, Grid, Paper } from '@material-ui/core';
import { useParams } from 'react-router'
import { CoinWatchListContext } from './../context/CoinWatchListContext.jsx';
import { makeStyles } from "@material-ui/core/styles";
import Coin from '../components/CoinDetailPage/Coin.jsx';
import Details from '../components/CoinDetailPage/Details.jsx';
import Header from './../components/Header.jsx';
import Graph from '../components/CoinDetailPage/Graph'
// TODO Need to make it responsive
const CoinDetailPage = () => {
    const useStyles = makeStyles(theme => ({
        // root: {
        //     flexGrow: 1,
        // },
        paper: {
            //  padding: theme.spacing(1),
            //  textAlign: "center",
            color: theme.palette.text.secondary,
            backgroundColor: "#212f45",
            opacity: '1',
            borderRadius: '10px'
            // border: ' 1px solid red',

        },
        mainContainer: {
            // height: '50%',
            width: '80%',
            marginTop: '1%'
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
    const [isLoading, setIsLoading] = useState(false);
    const [coin, setCoin] = useState('');
    const { currency } = useContext(CoinWatchListContext);

    useEffect(() => {
        const fetchApi = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get('https://rdmycorsproxy.herokuapp.com/https://api.coingecko.com/api/v3/coins/markets', {
                    params: {
                        vs_currency: currency,
                        ids: id
                    }
                })
                // console.log(res.data[0])
                setCoin(res.data[0]);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchApi();

    }, [currency, id])

    // style={{ width: "50vw", height: "50vh" }}
    //border: 'solid green 2px' style={{ maxHeight: '100vh' }}
    return (
        <>
            <Header />
            <Grid container justify="center" alignItems="center">
                <Grid container item justify="center" alignItems="center" className={classes.mainContainer}  spacing={4}>
                    <Grid container direction="column" item xs={6} spacing={1} >
                        <Grid item xs={12} style={{marginTop:"70px"}}>
                            <Paper className={`${classes.paper} ${classes.coin}`}>
                                <Coin coin={coin} />
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper className={`${classes.paper} ${classes.details}`}>
                                <Details coin={coin} isLoading={isLoading} />
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid item xs={6} >
                        <Paper className={`${classes.paper} ${classes.graph}`} style={{padding: '30px'}}>
                         <Graph coin={coin}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default CoinDetailPage