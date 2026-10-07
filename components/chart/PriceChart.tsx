'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useChartStore } from './chartStore';

interface PriceChartProps {
    symbol: string;
    interval: string;
}

// ============================================================
// MAPPING: Symbol internal → TradingView symbol
// ============================================================
const TV_SYMBOL_MAP: Record<string, string> = {
    BTCUSDT: 'BINANCE:BTCUSDT',
    ETHUSDT: 'BINANCE:ETHUSDT',
    SOLUSDT: 'BINANCE:SOLUSDT',
    XRPUSDT: 'BINANCE:XRPUSDT',
    DOGEUSDT: 'BINANCE:DOGEUSDT',
    BNBUSDT: 'BINANCE:BNBUSDT',
    ADAUSDT: 'BINANCE:ADAUSDT',
    AVAXUSDT: 'BINANCE:AVAXUSDT',
    LINKUSDT: 'BINANCE:LINKUSDT',
    MATICUSDT: 'BINANCE:MATICUSDT',
};

// ============================================================
// MAPPING: Timeframe internal → TradingView interval
// ============================================================
const TV_INTERVAL_MAP: Record<string, string> = {
    '1m': '1',
    '3m': '3',
    '5m': '5',
    '15m': '15',
    '30m': '30',
    '1h': '60',
    '2h': '120',
    '4h': '240',
    '6h': '360',
    '8h': '480',
    '12h': '720',
    '1d': 'D',
    '3d': '3D',
    '1w': 'W',
    '1M': 'M',
};

// ============================================================
// MAPPING: Chart type → TradingView style
// ============================================================
const TV_STYLE_MAP: Record<string, string> = {
    candlestick: '1',
    bar: '0',
    line: '2',
    area: '3',
};

export default function PriceChart({ symbol, interval }: PriceChartProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetRef = useRef<HTMLDivElement | null>(null);

    // ✅ Ambil individual value dengan fallback agar tidak undefined
    const chartType = useChartStore((state) => state.chartType) || 'candlestick';
    const indicators = useChartStore((state) => state.indicators) || [];

    const tvSymbol = TV_SYMBOL_MAP[symbol] || 'BINANCE:BTCUSDT';
    const tvInterval = TV_INTERVAL_MAP[interval] || 'D';

    // Chart type → TradingView style
    const tvStyle = useMemo(
        () => TV_STYLE_MAP[chartType] || TV_STYLE_MAP.candlestick,
        [chartType]
    );

    // Indicators → TradingView studies
    const tvStudies = useMemo(() => {
        const list: string[] = [];
        if (!Array.isArray(indicators)) return list;

        indicators.forEach((id) => {
            if (id === 'ma20') list.push('MASimple@tv-basicstudies');
            if (id === 'ma50') list.push('MASimple@tv-basicstudies');
            if (id === 'ema20') list.push('MAExp@tv-basicstudies');
            if (id === 'bb') list.push('BB@tv-basicstudies');
            if (id === 'rsi') list.push('RSI@tv-basicstudies');
            if (id === 'macd') list.push('MACD@tv-basicstudies');
        });
        return list;
    }, [indicators]);

    // ============================================================
    // RENDER WIDGET
    // ============================================================
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // ✅ Buat wrapper BARU (jangan pakai container.innerHTML)
        const widgetWrapper = document.createElement('div');
        widgetWrapper.className = 'tradingview-widget-container';
        widgetWrapper.style.height = '100%';
        widgetWrapper.style.width = '100%';

        const widgetInner = document.createElement('div');
        widgetInner.className = 'tradingview-widget-container__widget';
        widgetInner.style.height = '100%';
        widgetInner.style.width = '100%';

        widgetWrapper.appendChild(widgetInner);
        container.appendChild(widgetWrapper);

        // Simpan referensi untuk cleanup
        widgetRef.current = widgetWrapper;

        const script = document.createElement('script');
        script.src =
            'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = JSON.stringify({
            autosize: true,
            symbol: tvSymbol,
            interval: tvInterval,
            timezone: 'Asia/Jakarta',
            theme: 'dark',
            style: tvStyle,
            locale: 'id',
            backgroundColor: 'rgba(4, 6, 10, 1)',
            gridColor: 'rgba(26, 34, 48, 0.5)',
            hide_side_toolbar: false,
            hide_top_toolbar: false,
            allow_symbol_change: true,
            save_image: true,
            withdateranges: true,
            details: false,
            calendar: false,
            hotlist: false,
            studies: tvStudies,
            show_popup_button: false,
            popup_width: '1000',
            popup_height: '650',
            support_host: 'https://www.tradingview.com',
        });

        widgetWrapper.appendChild(script);

        // ✅ Cleanup dengan removeChild (BUKAN innerHTML = '')
        return () => {
            if (widgetWrapper.parentNode) {
                widgetWrapper.parentNode.removeChild(widgetWrapper);
            }
            widgetRef.current = null;
        };
    }, [tvSymbol, tvInterval, tvStyle, tvStudies]);

    return (
        <div className="relative h-full w-full bg-za-bg">
            <div
                ref={containerRef}
                className="tradingview-widget-container h-full w-full"
            />
        </div>
    );
}