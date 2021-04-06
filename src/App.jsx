import React from 'react';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import { Route } from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import { BrowserRouter, Switch } from "react-router-dom";
import { CoinWatchListContextProvider } from './context/CoinWatchListContext.jsx';
import { CoinsContextProvider } from './context/CoinsContext.jsx';
import defaultTheme from './DefaultTheme.js';
import CoinDetailPage from './pages/CoinDetailPage.jsx';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  },
})

const useStyles = makeStyles({
  appContainer: {
    minHeight: '100vh',
    //  minWidth: '100vw'
  },

  container: {
    // minWidth: '80vw',
    minHeight: '100vh',
    // minWidth: '100vw'
  }
})
console.log("app");
function App() {
  const classes = useStyles();

  return (
   
    <ThemeProvider theme={defaultTheme}>
       {/* <CssBaseline /> */}
      <Paper className={classes.appContainer} square>
        <Grid className={classes.container}>
            <CoinsContextProvider>
              <CoinWatchListContextProvider>
                <BrowserRouter>
                  <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/coins/:id" component={CoinDetailPage} />
                  </Switch>
                </BrowserRouter>
              </CoinWatchListContextProvider>
            </CoinsContextProvider>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default App;