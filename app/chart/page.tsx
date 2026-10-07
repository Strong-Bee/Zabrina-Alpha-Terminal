import type { Metadata } from 'next';
import ChartWorkspace from '@/components/chart/ChartWorkspace';

export const metadata: Metadata = {
    title: 'Chart',
    description:
        'Chart workspace profesional dengan TradingView widget, watchlist real-time, dan trading simulasi.',
};

export default function ChartPage() {
    return (
        <main className="relative min-h-screen bg-za-bg">
            {/* Ambient background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="glow-orb glow-cyan absolute -top-40 left-1/4 h-[500px] w-[500px] opacity-10" />
                <div className="glow-orb glow-purple absolute -bottom-40 right-1/4 h-[500px] w-[500px] opacity-10" />
            </div>

            <div className="relative">
                <ChartWorkspace />
            </div>
        </main>
    );
}