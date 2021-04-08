import React, { createContext, useState } from 'react';

export const CoinWatchListContext = createContext();

export const CoinWatchListContextProvider = props => {
    const [coinWatchList, setCoinWatchList] = useState([]);
    const [currency, setCurrency] = useState('usd')

    const trackCoin = coin => {
        if (  coin && coinWatchList.filter(item => item.id === coin.id).length === 0 ) {
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