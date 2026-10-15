import type { Metadata } from 'next';
import MemeCoinScanner from '@/components/meme-coins/MemeCoinScanner';

export const metadata: Metadata = {
  title: 'Solana Meme Coin Scanner',
  description: 'Pantau pair meme coin Solana dengan filter volume, likuiditas, umur pair, dan aktivitas transaksi dari DEX Screener.',
};

export default function MemeCoinsPage() {
  return (
    <main className="min-h-screen bg-za-bg px-4 py-8 text-za-text md:px-8">
      <div className="mx-auto max-w-[1600px]">
        <MemeCoinScanner />
      </div>
    </main>
  );
}
