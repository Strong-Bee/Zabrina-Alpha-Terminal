import type { Metadata } from 'next';
import MarketIntelligence from '@/components/market/MarketIntelligence';

export const metadata: Metadata = {
  title: 'Market Radar AI — Zabrina Alpha Terminal',
  description: 'Pantau momentum pasar kripto dan minta interpretasi NVIDIA AI.',
};

export default function MarketRadarPage() {
  return <MarketIntelligence mode="radar" />;
}
