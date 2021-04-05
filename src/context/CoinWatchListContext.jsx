import React, { createContext, useState } from 'react';

export const CoinWatchListContext = createContext();

export const CoinWatchListContextProvider = props => {
    const [coinWatchList, setCoinWatchList] = useState([]);
    const [currency, setCurrency] = useState('usd')

    const trackCoin = coin => {
        if (coinWatchList.indexOf(coin) === -1 && coin) {
            setCoinWatchList([...coinWatchList, coin]);
        }
    }

    const unTrackCoin = id => {
        setCoinWatchList(coinWatchList.filter(coin => coin.id !== id));
    }

    return (
        <CoinWatchListContext.Provider value={{ coinWatchList, trackCoin, unTrackCoin,currency,setCurrency }}>
            {props.children}
        </CoinWatchListContext.Provider>
    )
}