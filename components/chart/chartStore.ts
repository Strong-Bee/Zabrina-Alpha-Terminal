import { create } from 'zustand';

interface ChartState {
    // Symbol & TF
    symbol: string;
    timeframe: string;
    setSymbol: (s: string) => void;
    setTimeframe: (tf: string) => void;

    // Chart type
    chartType: 'candlestick' | 'line' | 'area' | 'bar';
    setChartType: (t: ChartState['chartType']) => void;

    // Indicators
    indicators: string[];
    toggleIndicator: (id: string) => void;
    clearIndicators: () => void;

    // UI state
    watchlistOpen: boolean;
    setWatchlistOpen: (v: boolean) => void;
}

export const useChartStore = create<ChartState>((set) => ({
    symbol: 'BTCUSDT',
    timeframe: '1d',
    setSymbol: (s) => set({ symbol: s }),
    setTimeframe: (tf) => set({ timeframe: tf }),

    chartType: 'candlestick',
    setChartType: (t) => set({ chartType: t }),

    indicators: [], // ← WAJIB: array kosong default
    toggleIndicator: (id) =>
        set((state) => ({
            indicators: state.indicators.includes(id)
                ? state.indicators.filter((i) => i !== id)
                : [...state.indicators, id],
        })),
    clearIndicators: () => set({ indicators: [] }),

    watchlistOpen: true,
    setWatchlistOpen: (v) => set({ watchlistOpen: v }),
}));