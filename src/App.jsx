import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { Route } from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import { BrowserRouter, Switch } from "react-router-dom";
import { CoinWatchListContextProvider } from './context/CoinWatchListContext.jsx';
import defaultTheme from './DefaultTheme.js';
import CoinDetailPage from './pages/CoinDetailPage.jsx';

const useStyles = makeStyles({
  appContainer: {
    minHeight: '100vh',
    width: '100vw'
  },
})

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper className={classes.appContainer} square>
        <CoinWatchListContextProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/coins/:id" component={CoinDetailPage} />
            </Switch>
          </BrowserRouter>
        </CoinWatchListContextProvider>
      </Paper>
    </ThemeProvider>
  );
}

export default App;