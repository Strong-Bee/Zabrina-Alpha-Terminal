import type {
    MarketNewsItem,
    MacroIndicatorGroup,
    ReleaseSummary,
    CentralBankRate,
    SentimentRow,
    FundamentalItem,
} from './types';

export const MARKET_NEWS: MarketNewsItem[] = [];
export const MACRO_GROUPS: MacroIndicatorGroup[] = [];
export const RELEASE_SUMMARIES: ReleaseSummary[] = [];
export const CENTRAL_BANK_RATES: CentralBankRate[] = [];
export const SENTIMENTS: SentimentRow[] = [];
export const FEAR_GREED = {
    value: 50,
    label: 'Neutral',
    yesterday: 50,
    lastWeek: 50,
    lastMonth: 50,
};
export const FUNDAMENTAL_ITEMS: FundamentalItem[] = [];