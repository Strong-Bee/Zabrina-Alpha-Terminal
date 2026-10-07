export interface Symbol {
    id: string;
    ticker: string;
    name: string;
    category: 'crypto' | 'forex' | 'indices';
}

export interface Kline {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface Ticker24h {
    symbol: string;
    lastPrice: number;
    priceChange: number;
    priceChangePercent: number;
    highPrice: number;
    lowPrice: number;
    openPrice: number;
    volume: number;
    quoteVolume: number;
}