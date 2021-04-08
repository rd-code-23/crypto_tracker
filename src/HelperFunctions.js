export const getCurrencySymbol = (currency) => {
    switch (currency) {
        case 'btc':
            return '₿';
        case 'gbp':
            return '£';
        case 'eur':
            return '€';
        case 'jpy':
            return '¥';
        default:
            return '$';
    }
}

export const MOBILE_WIDTH = "(max-width: 1024px)";


