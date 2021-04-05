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