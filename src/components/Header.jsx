import React, { useContext } from 'react';
import { AppBar, Toolbar, FormControl, Select, Grid } from '@material-ui/core/';
import { makeStyles } from "@material-ui/core/styles";
import { CoinWatchListContext } from './../context/CoinWatchListContext.jsx';
import logo from './../images/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
    const useStyles = makeStyles(theme => ({
        dropdownArrow: {
            "& .MuiSelect-icon": {
                color: '#778DA9'
            }
        },
    }));
    const classes = useStyles();

    const { currency, setCurrency } = useContext(CoinWatchListContext);

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    return (
        //264653
        <AppBar position="static" style={{ backgroundColor: '#1B263B' }}>
            <Toolbar >
                <Grid container justify="space-between" alignItems="center">
                    {/* Logo from https://www.flaticon.com/free-icon/cpu_3985642 */}
                    <Link to={'/crypto_tracker'} style={{ textDecoration: 'none' }}>
                        <Grid item>
                            <img src={logo} style={{ height: '55px' }} alt="logo" />
                        </Grid>
                    </Link>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <Select
                                native
                                disableUnderline={true}
                                value={currency}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'age',
                                    id: 'filled-age-native-simple',
                                }}
                                className={classes.dropdownArrow}
                                style={{ color: '#F1FAEE' }}
                            >

                                <option value={'usd'} style={{ color: '#F1FAEE' }}>USD</option>
                                <option value={'btc'} style={{ color: '#F1FAEE' }}>BTC</option>
                                <option value={'cad'} style={{ color: '#F1FAEE' }}>CAD</option>
                                <option value={'gbp'} style={{ color: '#F1FAEE' }}>GBP</option>
                                <option value={'eur'} style={{ color: '#F1FAEE' }}>EUR</option>
                                <option value={'jpy'} style={{ color: '#F1FAEE' }}>JPY</option>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header