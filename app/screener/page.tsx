import type { Metadata } from 'next';
import MarketIntelligence from '@/components/market/MarketIntelligence';

export const metadata: Metadata = {
  title: 'Crypto Screener AI — Zabrina Alpha Terminal',
  description: 'Saring aset kripto dengan indikator teknikal dan analisis NVIDIA AI.',
};

export default function ScreenerPage() {
  return <MarketIntelligence mode="screener" />;
}
