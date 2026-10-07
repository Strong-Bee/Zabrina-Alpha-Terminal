import type { Metadata } from 'next';
import NewsPage from '@/components/news/NewsPage';

export const metadata: Metadata = {
    title: 'Berita Pasar',
    description:
        'Berita pasar terkini: crypto, saham lokal (IDX), dan saham global. Diperbarui otomatis.',
};

export default function NewsRoute() {
    return (
        <main className="relative min-h-screen bg-za-bg">
            {/* Ambient background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 terminal-grid opacity-30" />
                <div className="glow-orb glow-cyan absolute -top-40 left-1/4 h-[500px] w-[500px] opacity-15" />
                <div className="glow-orb glow-purple absolute -bottom-40 right-1/4 h-[500px] w-[500px] opacity-10" />
            </div>

            <div className="relative mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
                <NewsPage />
            </div>
        </main>
    );
}