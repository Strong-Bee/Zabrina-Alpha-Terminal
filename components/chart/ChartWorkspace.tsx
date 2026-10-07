'use client';

import { useChartStore } from './chartStore';
import TopToolbar from './TopToolbar';
import PriceChart from './PriceChart';
import Watchlist from './Watchlist';

export default function ChartWorkspace() {
    const { symbol, timeframe, watchlistOpen, setWatchlistOpen } = useChartStore();

    return (
        <div className="flex h-[calc(100vh-68px)] flex-col bg-za-bg text-za-text">
            <TopToolbar />

            <div className="flex flex-1 overflow-hidden">
                <div className="relative flex flex-1 flex-col overflow-hidden">
                    <PriceChart symbol={symbol} interval={timeframe} />
                </div>

                {watchlistOpen && <Watchlist onClose={() => setWatchlistOpen(false)} />}
            </div>
        </div>
    );
}