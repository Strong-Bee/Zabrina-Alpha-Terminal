import type { Symbol } from './types';

export const SYMBOLS: Symbol[] = [
    { id: 'BTCUSDT', ticker: 'BTC/USDT', name: 'Bitcoin', category: 'crypto' },
    { id: 'ETHUSDT', ticker: 'ETH/USDT', name: 'Ethereum', category: 'crypto' },
    { id: 'SOLUSDT', ticker: 'SOL/USDT', name: 'Solana', category: 'crypto' },
    { id: 'XRPUSDT', ticker: 'XRP/USDT', name: 'XRP', category: 'crypto' },
    { id: 'DOGEUSDT', ticker: 'DOGE/USDT', name: 'Dogecoin', category: 'crypto' },
    { id: 'BNBUSDT', ticker: 'BNB/USDT', name: 'BNB', category: 'crypto' },
    { id: 'ADAUSDT', ticker: 'ADA/USDT', name: 'Cardano', category: 'crypto' },
    { id: 'AVAXUSDT', ticker: 'AVAX/USDT', name: 'Avalanche', category: 'crypto' },
    { id: 'LINKUSDT', ticker: 'LINK/USDT', name: 'Chainlink', category: 'crypto' },
    { id: 'MATICUSDT', ticker: 'MATIC/USDT', name: 'Polygon', category: 'crypto' },
];

export const TIMEFRAMES = [
    // Menit
    { value: '1m', label: '1m', interval: '1m', group: 'minute' },
    { value: '3m', label: '3m', interval: '3m', group: 'minute' },
    { value: '5m', label: '5m', interval: '5m', group: 'minute' },
    { value: '15m', label: '15m', interval: '15m', group: 'minute' },
    { value: '30m', label: '30m', interval: '30m', group: 'minute' },

    // Jam
    { value: '1h', label: '1H', interval: '1h', group: 'hour' },
    { value: '2h', label: '2H', interval: '2h', group: 'hour' },
    { value: '4h', label: '4H', interval: '4h', group: 'hour' },
    { value: '6h', label: '6H', interval: '6h', group: 'hour' },
    { value: '8h', label: '8H', interval: '8h', group: 'hour' },
    { value: '12h', label: '12H', interval: '12h', group: 'hour' },

    // Hari / Minggu / Bulan
    { value: '1d', label: '1D', interval: '1d', group: 'day' },
    { value: '3d', label: '3D', interval: '3d', group: 'day' },
    { value: '1w', label: '1W', interval: '1w', group: 'week' },
    { value: '1M', label: '1M', interval: '1M', group: 'month' },
];

// Durasi tiap interval dalam detik (untuk countdown)
export const INTERVAL_SECONDS: Record<string, number> = {
    '1m': 60,
    '3m': 180,
    '5m': 300,
    '15m': 900,
    '30m': 1800,
    '1h': 3600,
    '2h': 7200,
    '4h': 14400,
    '6h': 21600,
    '8h': 28800,
    '12h': 43200,
    '1d': 86400,
    '3d': 259200,
    '1w': 604800,
    '1M': 2592000, // aproksimasi 30 hari
};

export const WS_INTERVAL_MAP: Record<string, string> = {
    '1m': '1m',
    '3m': '3m',
    '5m': '5m',
    '15m': '15m',
    '30m': '30m',
    '1h': '1h',
    '2h': '2h',
    '4h': '4h',
    '6h': '6h',
    '8h': '8h',
    '12h': '12h',
    '1d': '1d',
    '3d': '3d',
    '1w': '1w',
    '1M': '1M',
};

export const CATEGORY_LABELS = {
    crypto: 'Crypto',
    forex: 'Forex',
    indices: 'Indices',
    commodities: 'Commodities',
};