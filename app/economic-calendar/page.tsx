import type { Metadata } from 'next';
import EconomicCalendarHub from '@/components/economic-calendar/EconomicCalendarHub';

export const metadata: Metadata = {
    metadataBase: new URL('https://zabrina-alpha.terminal'),
    title: 'Kalender Ekonomi',
    description:
        'Kalender ekonomi live: agenda event real-time dari TradingView & World Bank, kabar pasar, indikator makro, suku bunga bank sentral, dan wawasan pasar.',
    keywords: [
        'kalender ekonomi',
        'economic calendar',
        'agenda ekonomi',
        'event ekonomi',
        'forex',
        'trading',
        'GDP',
        'suku bunga',
        'bank sentral',
        'FOMC',
        'NFP',
        'CPI',
    ],
    openGraph: {
        title: 'Kalender Ekonomi — ZABRINA ALPHA TERMINAL',
        description:
            'Pantau semua event ekonomi global dalam satu layar. Real-time dari berbagai sumber terpercaya.',
        type: 'website',
        locale: 'id_ID',
        siteName: 'ZABRINA ALPHA TERMINAL',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Kalender Ekonomi — ZABRINA ALPHA TERMINAL',
        description:
            'Pantau semua event ekonomi global dalam satu layar. Real-time dari berbagai sumber terpercaya.',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
};

export default function EconomicCalendarPage() {
    return (
        <main className="relative min-h-screen bg-za-bg">
            {/* Ambient background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 terminal-grid opacity-30" />
                <div className="glow-orb glow-cyan absolute -top-40 left-1/4 h-[500px] w-[500px] opacity-15" />
                <div className="glow-orb glow-purple absolute -bottom-40 right-1/4 h-[500px] w-[500px] opacity-10" />
            </div>

            {/* Content */}
            <div className="relative">
                <EconomicCalendarHub />
            </div>
        </main>
    );
}