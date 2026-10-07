'use client';

import { useEffect, useRef } from 'react';

export default function EconomicMap() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Buat wrapper baru
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

        const script = document.createElement('script');
        script.src =
            'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = JSON.stringify({
            colorTheme: 'dark',
            dateRange: '12M',
            showChart: true,
            locale: 'id',
            width: '100%',
            height: '100%',
            largeChartUrl: '',
            isTransparent: true,
            showSymbolLogo: true,
            showFloatingTooltip: false,
            plotLineColorGrowing: 'rgba(0, 229, 153, 1)',
            plotLineColorFalling: 'rgba(255, 71, 87, 1)',
            gridLineColor: 'rgba(26, 34, 48, 0.5)',
            scaleFontColor: '#8b98ab',
            belowLineFillColorGrowing: 'rgba(0, 229, 153, 0.12)',
            belowLineFillColorFalling: 'rgba(255, 71, 87, 0.12)',
            belowLineFillColorGrowingBottom: 'rgba(0, 229, 153, 0)',
            belowLineFillColorFallingBottom: 'rgba(255, 71, 87, 0)',
            symbolActiveColor: 'rgba(0, 212, 255, 0.12)',
            tabs: [
                {
                    title: 'Indices',
                    symbols: [
                        { s: 'FOREXCOM:SPXUSD', d: 'S&P 500' },
                        { s: 'FOREXCOM:NSXUSD', d: 'Nasdaq 100' },
                        { s: 'FOREXCOM:DJI', d: 'Dow 30' },
                        { s: 'INDEX:NKY', d: 'Nikkei 225' },
                        { s: 'INDEX:DEU40', d: 'DAX Index' },
                    ],
                },
                {
                    title: 'Forex',
                    symbols: [
                        { s: 'FX:EURUSD', d: 'EUR/USD' },
                        { s: 'FX:GBPUSD', d: 'GBP/USD' },
                        { s: 'FX:USDJPY', d: 'USD/JPY' },
                        { s: 'FX:AUDUSD', d: 'AUD/USD' },
                    ],
                },
                {
                    title: 'Commodities',
                    symbols: [
                        { s: 'TVC:GOLD', d: 'Gold' },
                        { s: 'TVC:SILVER', d: 'Silver' },
                        { s: 'TVC:USOIL', d: 'WTI Oil' },
                        { s: 'TVC:UKOIL', d: 'Brent' },
                    ],
                },
                {
                    title: 'Crypto',
                    symbols: [
                        { s: 'BINANCE:BTCUSDT', d: 'Bitcoin' },
                        { s: 'BINANCE:ETHUSDT', d: 'Ethereum' },
                        { s: 'BINANCE:SOLUSDT', d: 'Solana' },
                    ],
                },
            ],
        });

        widgetWrapper.appendChild(script);

        // ✅ Cleanup dengan removeChild (bukan innerHTML = '')
        return () => {
            if (widgetWrapper.parentNode) {
                widgetWrapper.parentNode.removeChild(widgetWrapper);
            }
        };
    }, []);

    return (
        <section className="mx-auto max-w-7xl px-5 pb-12 md:px-8">
            <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-8 bg-za-accent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-za-accent">
                    Visual
                </span>
            </div>

            <h2 className="text-display mb-4 text-3xl text-white md:text-4xl">
                Peta Ekonomi Global
            </h2>
            <p className="mb-8 max-w-2xl text-sm text-za-text-muted">
                Pemetaan data sekilas secara global dari TradingView.
            </p>

            <div className="overflow-hidden rounded-2xl border border-za-border bg-za-surface/40">
                <div ref={containerRef} className="h-[600px] w-full" />
            </div>
        </section>
    );
}