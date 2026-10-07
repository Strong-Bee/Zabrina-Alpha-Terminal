import type { NewsSource } from '@/components/news/types';

export const NEWS_SOURCES: NewsSource[] = [
    // =========================================================
    // CRYPTO — GENERAL
    // =========================================================
    {
        id: 'coindesk',
        name: 'CoinDesk',
        url: 'https://www.coindesk.com/arc/outboundfeeds/rss/',
        category: 'crypto',
        icon: '₿',
    },
    {
        id: 'cointelegraph',
        name: 'Cointelegraph',
        url: 'https://cointelegraph.com/rss',
        category: 'crypto',
        icon: '◈',
    },
    {
        id: 'decrypt',
        name: 'Decrypt',
        url: 'https://decrypt.co/feed',
        category: 'crypto',
        icon: '⬢',
    },
    {
        id: 'bitcoinmagazine',
        name: 'Bitcoin Magazine',
        url: 'https://bitcoinmagazine.com/feed',
        category: 'crypto',
        icon: '₿',
    },
    {
        id: 'theblock',
        name: 'The Block',
        url: 'https://www.theblock.co/rss.xml',
        category: 'crypto',
        icon: '⬛',
    },
    {
        id: 'cryptoslate',
        name: 'CryptoSlate',
        url: 'https://cryptoslate.com/feed/',
        category: 'crypto',
        icon: '🔷',
    },
    {
        id: 'bitcoinist',
        name: 'Bitcoinist',
        url: 'https://bitcoinist.com/feed/',
        category: 'crypto',
        icon: '🟠',
    },
    {
        id: 'newsbtc',
        name: 'NewsBTC',
        url: 'https://www.newsbtc.com/feed/',
        category: 'crypto',
        icon: '📰',
    },
    {
        id: 'cryptonews',
        name: 'CryptoNews',
        url: 'https://cryptonews.com/news/feed/',
        category: 'crypto',
        icon: '🔶',
    },
    {
        id: 'beincrypto',
        name: 'BeInCrypto',
        url: 'https://beincrypto.com/feed/',
        category: 'crypto',
        icon: '🔐',
    },
    {
        id: 'cryptopolitan',
        name: 'Cryptopolitan',
        url: 'https://www.cryptopolitan.com/feed/',
        category: 'crypto',
        icon: '🌐',
    },
    {
        id: 'the-defiant',
        name: 'The Defiant',
        url: 'https://thedefiant.io/feed/',
        category: 'crypto',
        icon: '⚡',
    },
    {
        id: 'fortune-crypto',
        name: 'Fortune Crypto',
        url: 'https://fortune.com/section/crypto/feed/',
        category: 'crypto',
        icon: '💰',
    },
    {
        id: 'bloomberg-crypto',
        name: 'Bloomberg Crypto',
        url: 'https://feeds.bloomberg.com/crypto/news.rss',
        category: 'crypto',
        icon: '🔵',
    },
    {
        id: 'ft-crypto',
        name: 'Financial Times Crypto',
        url: 'https://www.ft.com/crypto?format=rss',
        category: 'crypto',
        icon: '📕',
    },
    {
        id: 'techcrunch-crypto',
        name: 'TechCrunch Crypto',
        url: 'https://techcrunch.com/category/cryptocurrency/feed/',
        category: 'crypto',
        icon: '₿',
    },
    {
        id: 'coingecko-blog',
        name: 'CoinGecko',
        url: 'https://blog.coingecko.com/feed/',
        category: 'crypto',
        icon: '🦎',
    },
    {
        id: 'coinmarketcap-blog',
        name: 'CoinMarketCap',
        url: 'https://blog.coinmarketcap.com/feed/',
        category: 'crypto',
        icon: '💎',
    },
    {
        id: 'l2beat',
        name: 'L2BEAT',
        url: 'https://l2beat.com/blog/rss.xml',
        category: 'crypto',
        icon: 'L2',
    },
    {
        id: 'chainlink',
        name: 'Chainlink',
        url: 'https://blog.chain.link/rss/',
        category: 'crypto',
        icon: '🔗',
    },
    {
        id: 'immunefi',
        name: 'Immunefi',
        url: 'https://immunefi.com/blog/feed/',
        category: 'crypto',
        icon: '🛡️',
    },
    {
        id: 'openzeppelin',
        name: 'OpenZeppelin',
        url: 'https://blog.openzeppelin.com/rss',
        category: 'crypto',
        icon: '🛡️',
    },
    {
        id: 'solana-news',
        name: 'Solana',
        url: 'https://solana.com/news/rss.xml',
        category: 'crypto',
        icon: '◎',
    },
    {
        id: 'solana-google',
        name: 'Solana News',
        url: 'https://news.google.com/rss/search?q=Solana%20crypto&hl=en-US&gl=US&ceid=US:en',
        category: 'crypto',
        icon: '◎',
    },

    // =========================================================
    // SAHAM LOKAL / IDX
    // =========================================================
    {
        id: 'kontan',
        name: 'Kontan',
        url: 'https://www.kontan.co.id/rss',
        category: 'saham-lokal',
        icon: '📊',
    },
    {
        id: 'bisnis',
        name: 'Bisnis.com',
        url: 'https://www.bisnis.com/rss',
        category: 'saham-lokal',
        icon: '📈',
    },
    {
        id: 'cnbc-indonesia',
        name: 'CNBC Indonesia',
        url: 'https://www.cnbcindonesia.com/rss',
        category: 'saham-lokal',
        icon: '📺',
    },
    {
        id: 'detik-finance',
        name: 'Detik Finance',
        url: 'https://finance.detik.com/rss',
        category: 'saham-lokal',
        icon: '📰',
    },
    {
        id: 'investor-id',
        name: 'Investor.id',
        url: 'https://investor.id/rss',
        category: 'saham-lokal',
        icon: '💼',
    },
    {
        id: 'katadata',
        name: 'Katadata',
        url: 'https://katadata.co.id/rss',
        category: 'saham-lokal',
        icon: '📈',
    },
    {
        id: 'tirto',
        name: 'Tirto.id',
        url: 'https://tirto.id/rss',
        category: 'saham-lokal',
        icon: '📰',
    },
    {
        id: 'kompas-ekonomi',
        name: 'Kompas Ekonomi',
        url: 'https://rss.kompas.com/api/feed/ekonomi',
        category: 'saham-lokal',
        icon: '📋',
    },
    {
        id: 'antara-ekonomi',
        name: 'Antara Ekonomi',
        url: 'https://www.antaranews.com/rss/ekonomi.xml',
        category: 'saham-lokal',
        icon: '📡',
    },
    {
        id: 'tempo-bisnis',
        name: 'Tempo Bisnis',
        url: 'https://rss.tempo.co/bisnis',
        category: 'saham-lokal',
        icon: '📰',
    },
    {
        id: 'idx-news-google',
        name: 'IDX News',
        url: 'https://news.google.com/rss/search?q=IDX%20OR%20IHSG%20OR%20saham%20Indonesia&hl=id&gl=ID&ceid=ID:id',
        category: 'saham-lokal',
        icon: '🇮🇩',
    },
    {
        id: 'ihsg-news-google',
        name: 'IHSG News',
        url: 'https://news.google.com/rss/search?q=IHSG%20OR%20IDX%20OR%20Jakarta%20Composite&hl=id&gl=ID&ceid=ID:id',
        category: 'saham-lokal',
        icon: '📊',
    },

    // =========================================================
    // SAHAM GLOBAL
    // =========================================================
    {
        id: 'reuters-markets',
        name: 'Reuters Markets',
        url: 'https://news.google.com/rss/search?q=when:7d%20site:reuters.com/markets&ceid=US:en&hl=en-US&gl=US',
        category: 'saham-global',
        icon: '🌐',
    },
    {
        id: 'reuters-business',
        name: 'Reuters Business',
        url: 'https://news.google.com/rss/search?q=when:24h%20site:reuters.com/business&ceid=US:en&hl=en-US&gl=US',
        category: 'saham-global',
        icon: '🌐',
    },
    {
        id: 'cnbc-top',
        name: 'CNBC Top News',
        url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html',
        category: 'saham-global',
        icon: '📺',
    },
    {
        id: 'cnbc-markets',
        name: 'CNBC Markets',
        url: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=20910258',
        category: 'saham-global',
        icon: '📊',
    },
    {
        id: 'cnbc-finance',
        name: 'CNBC Finance',
        url: 'https://www.cnbc.com/id/10000664/device/rss/rss.html',
        category: 'saham-global',
        icon: '🏦',
    },
    {
        id: 'cnbc-business',
        name: 'CNBC Business',
        url: 'https://www.cnbc.com/id/10001147/device/rss/rss.html',
        category: 'saham-global',
        icon: '💼',
    },
    {
        id: 'cnbc-asia',
        name: 'CNBC Asia',
        url: 'https://www.cnbc.com/id/19832390/device/rss/rss.html',
        category: 'saham-global',
        icon: '🌏',
    },
    {
        id: 'cnbc-europe',
        name: 'CNBC Europe',
        url: 'https://www.cnbc.com/id/19794221/device/rss/rss.html',
        category: 'saham-global',
        icon: '🇪🇺',
    },
    {
        id: 'yahoo-finance',
        name: 'Yahoo Finance',
        url: 'https://finance.yahoo.com/news/rssindex',
        category: 'saham-global',
        icon: '📈',
    },
    {
        id: 'marketwatch',
        name: 'MarketWatch',
        url: 'https://feeds.marketwatch.com/marketwatch/topstories/',
        category: 'saham-global',
        icon: '💹',
    },
    {
        id: 'bloomberg-markets',
        name: 'Bloomberg Markets',
        url: 'https://feeds.bloomberg.com/markets/news.rss',
        category: 'saham-global',
        icon: '🔵',
    },
    {
        id: 'ft-markets',
        name: 'Financial Times Markets',
        url: 'https://www.ft.com/markets?format=rss',
        category: 'saham-global',
        icon: '📕',
    },
    {
        id: 'ft-home',
        name: 'Financial Times',
        url: 'https://www.ft.com/rss/home',
        category: 'saham-global',
        icon: '📕',
    },
    {
        id: 'wsj-markets',
        name: 'WSJ Markets',
        url: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml',
        category: 'saham-global',
        icon: '📰',
    },
    {
        id: 'wsj-business',
        name: 'WSJ Business',
        url: 'https://feeds.a.dj.com/rss/WSJcomUSBusiness.xml',
        category: 'saham-global',
        icon: '📰',
    },
    {
        id: 'seeking-alpha',
        name: 'Seeking Alpha',
        url: 'https://seekingalpha.com/feed.xml',
        category: 'saham-global',
        icon: '🔍',
    },
    {
        id: 'seeking-alpha-market',
        name: 'Seeking Alpha Market Currents',
        url: 'https://seekingalpha.com/market_currents.xml',
        category: 'saham-global',
        icon: '⚡',
    },
    {
        id: 'investing-news',
        name: 'Investing.com',
        url: 'https://www.investing.com/rss/news.rss',
        category: 'saham-global',
        icon: '📊',
    },
    {
        id: 'benzinga',
        name: 'Benzinga',
        url: 'https://www.benzinga.com/feed',
        category: 'saham-global',
        icon: '🔔',
    },
    {
        id: 'business-insider',
        name: 'Business Insider',
        url: 'https://www.businessinsider.com/rss',
        category: 'saham-global',
        icon: '🅱️',
    },
    {
        id: 'global-markets',
        name: 'Global Markets',
        url: 'https://news.google.com/rss/search?q=stocks%20OR%20equities%20OR%20markets%20OR%20Nasdaq%20OR%20S%26P%20500%20OR%20Dow%20Jones&hl=en-US&gl=US&ceid=US:en',
        category: 'saham-global',
        icon: '🌎',
    },
    {
        id: 'wall-street',
        name: 'Wall Street',
        url: 'https://news.google.com/rss/search?q=Wall%20Street%20OR%20Nasdaq%20OR%20S%26P%20500%20OR%20Dow&hl=en-US&gl=US&ceid=US:en',
        category: 'saham-global',
        icon: '🏦',
    },

    // =========================================================
    // FOREX
    // =========================================================
    {
        id: 'fxstreet',
        name: 'FXStreet',
        url: 'https://www.fxstreet.com/rss/news',
        category: 'forex',
        icon: '💱',
    },
    {
        id: 'forexlive',
        name: 'ForexLive',
        url: 'https://www.forexlive.com/feed/news',
        category: 'forex',
        icon: '💱',
    },
    {
        id: 'dailyfx',
        name: 'DailyFX',
        url: 'https://www.dailyfx.com/feeds/forex',
        category: 'forex',
        icon: '📈',
    },
    {
        id: 'forex-news-google',
        name: 'Forex News',
        url: 'https://news.google.com/rss/search?q=forex%20OR%20EURUSD%20OR%20GBPUSD%20OR%20USDJPY&hl=en-US&gl=US&ceid=US:en',
        category: 'forex',
        icon: '💱',
    },

    // =========================================================
    // KOMODITAS
    // =========================================================
    {
        id: 'oilprice',
        name: 'OilPrice.com',
        url: 'https://oilprice.com/rss/main',
        category: 'komoditas',
        icon: '🛢️',
    },
    {
        id: 'commodities-news',
        name: 'Commodities News',
        url: 'https://news.google.com/rss/search?q=gold%20OR%20silver%20OR%20oil%20OR%20commodities&hl=en-US&gl=US&ceid=US:en',
        category: 'komoditas',
        icon: '🪙',
    },
    {
        id: 'gold-news',
        name: 'Gold News',
        url: 'https://news.google.com/rss/search?q=gold%20OR%20XAUUSD%20OR%20bullion&hl=en-US&gl=US&ceid=US:en',
        category: 'komoditas',
        icon: '🥇',
    },
    {
        id: 'oil-news',
        name: 'Oil News',
        url: 'https://news.google.com/rss/search?q=oil%20OR%20WTI%20OR%20Brent&hl=en-US&gl=US&ceid=US:en',
        category: 'komoditas',
        icon: '🛢️',
    },
    {
        id: 'cnbc-energy',
        name: 'CNBC Energy',
        url: 'https://www.cnbc.com/id/19836768/device/rss/rss.html',
        category: 'komoditas',
        icon: '⚡',
    },

    // =========================================================
    // MAKRO EKONOMI
    // =========================================================
    {
        id: 'federal-reserve',
        name: 'Federal Reserve',
        url: 'https://www.federalreserve.gov/feeds/press_all.xml',
        category: 'makro',
        icon: '🏦',
    },
    {
        id: 'ecb',
        name: 'European Central Bank',
        url: 'https://www.ecb.europa.eu/rss/press.html',
        category: 'makro',
        icon: '🇪🇺',
    },
    {
        id: 'ecb-publications',
        name: 'ECB Publications',
        url: 'https://www.ecb.europa.eu/rss/pub.html',
        category: 'makro',
        icon: '🇪🇺',
    },
    {
        id: 'macro-news',
        name: 'Global Macro',
        url: 'https://news.google.com/rss/search?q=Fed%20OR%20ECB%20OR%20inflation%20OR%20interest%20rates%20OR%20CPI%20OR%20NFP&hl=en-US&gl=US&ceid=US:en',
        category: 'makro',
        icon: '🏦',
    },
    {
        id: 'fed-news',
        name: 'Fed News',
        url: 'https://news.google.com/rss/search?q=Federal%20Reserve%20OR%20FOMC%20OR%20Powell&hl=en-US&gl=US&ceid=US:en',
        category: 'makro',
        icon: '🏦',
    },
    {
        id: 'inflation-news',
        name: 'Inflation / CPI',
        url: 'https://news.google.com/rss/search?q=inflation%20OR%20CPI%20OR%20PCE&hl=en-US&gl=US&ceid=US:en',
        category: 'makro',
        icon: '📊',
    },
    {
        id: 'jobs-news',
        name: 'Jobs / NFP',
        url: 'https://news.google.com/rss/search?q=NFP%20OR%20nonfarm%20payrolls%20OR%20unemployment%20OR%20jobs%20report&hl=en-US&gl=US&ceid=US:en',
        category: 'makro',
        icon: '👷',
    },
    {
        id: 'economist-finance',
        name: 'The Economist',
        url: 'https://www.economist.com/finance-and-economics/rss.xml',
        category: 'makro',
        icon: '📰',
    },
    {
        id: 'cnbc-economy',
        name: 'CNBC Economy',
        url: 'https://www.cnbc.com/id/20910258/device/rss/rss.html',
        category: 'makro',
        icon: '🏛️',
    },

    // =========================================================
    // GLOBAL / GEOPOLITIK
    // =========================================================
    {
        id: 'bbc-world',
        name: 'BBC World',
        url: 'https://feeds.bbci.co.uk/news/world/rss.xml',
        category: 'global',
        icon: '🌍',
    },
    {
        id: 'aljazeera',
        name: 'Al Jazeera',
        url: 'https://www.aljazeera.com/xml/rss/all.xml',
        category: 'global',
        icon: '🌍',
    },
    {
        id: 'geopolitics',
        name: 'Geopolitics',
        url: 'https://news.google.com/rss/search?q=geopolitics%20OR%20war%20OR%20sanctions%20OR%20tariffs&hl=en-US&gl=US&ceid=US:en',
        category: 'global',
        icon: '🌐',
    },
    {
        id: 'reuters-world',
        name: 'Reuters World',
        url: 'https://news.google.com/rss/search?q=site:reuters.com/world&hl=en-US&gl=US&ceid=US:en',
        category: 'global',
        icon: '🌐',
    },
    {
        id: 'cnbc-world',
        name: 'CNBC World',
        url: 'https://www.cnbc.com/id/100727362/device/rss/rss.html',
        category: 'global',
        icon: '🌍',
    },
    {
        id: 'cnbc-politics',
        name: 'CNBC Politics',
        url: 'https://www.cnbc.com/id/10000113/device/rss/rss.html',
        category: 'global',
        icon: '🏛️',
    },

    // =========================================================
    // TEKNOLOGI
    // =========================================================
    {
        id: 'techcrunch',
        name: 'TechCrunch',
        url: 'https://techcrunch.com/feed/',
        category: 'teknologi',
        icon: '💻',
    },
    {
        id: 'mit-tech-review',
        name: 'MIT Technology Review',
        url: 'https://www.technologyreview.com/feed/',
        category: 'teknologi',
        icon: '🔬',
    },
    {
        id: 'reuters-technology',
        name: 'Reuters Technology',
        url: 'https://news.google.com/rss/search?q=when:24h%20site:reuters.com/technology&ceid=US:en&hl=en-US&gl=US',
        category: 'teknologi',
        icon: '💻',
    },
    {
        id: 'bloomberg-technology',
        name: 'Bloomberg Technology',
        url: 'https://feeds.bloomberg.com/technology/news.rss',
        category: 'teknologi',
        icon: '🔵',
    },
    {
        id: 'ai-news',
        name: 'AI News',
        url: 'https://news.google.com/rss/search?q=artificial%20intelligence%20OR%20AI%20OR%20OpenAI%20OR%20NVIDIA&hl=en-US&gl=US&ceid=US:en',
        category: 'teknologi',
        icon: '🤖',
    },
    {
        id: 'nvidia-news',
        name: 'NVIDIA News',
        url: 'https://news.google.com/rss/search?q=NVIDIA%20OR%20NVDA&hl=en-US&gl=US&ceid=US:en',
        category: 'teknologi',
        icon: '🟢',
    },
];

// ============================================================
// CATEGORIES
// ============================================================

export const CATEGORIES = [
    {
        id: 'semua',
        label: 'Semua',
        icon: 'fa-newspaper',
        color: '#00d4ff',
        description: 'Semua berita pasar terbaru',
    },
    {
        id: 'crypto',
        label: 'Crypto',
        icon: 'fa-bitcoin-sign',
        color: '#f7931a',
        description:
            'Bitcoin, Ethereum, Solana, altcoin, DeFi, Web3, NFT, dan blockchain',
    },
    {
        id: 'saham-lokal',
        label: 'Saham Lokal',
        icon: 'fa-flag',
        color: '#ff4757',
        description:
            'Berita saham Indonesia, IDX, IHSG, emiten, ekonomi dan korporasi',
    },
    {
        id: 'saham-global',
        label: 'Saham Global',
        icon: 'fa-globe',
        color: '#00d4ff',
        description: 'US stocks, Nasdaq, S&P 500, Dow Jones, Eropa dan Asia',
    },
    {
        id: 'forex',
        label: 'Forex',
        icon: 'fa-money-bill-transfer',
        color: '#2ed573',
        description:
            'Forex, FX, EURUSD, GBPUSD, USDJPY, DXY dan mata uang global',
    },
    {
        id: 'komoditas',
        label: 'Komoditas',
        icon: 'fa-coins',
        color: '#ffa502',
        description: 'Gold, silver, oil, WTI, Brent dan komoditas global',
    },
    {
        id: 'makro',
        label: 'Makro',
        icon: 'fa-building-columns',
        color: '#a55eea',
        description:
            'Fed, ECB, FOMC, CPI, PCE, NFP, inflasi, suku bunga dan ekonomi',
    },
    {
        id: 'global',
        label: 'Global',
        icon: 'fa-earth-americas',
        color: '#1e90ff',
        description:
            'Geopolitik, perang, kebijakan pemerintah, sanksi dan berita global',
    },
    {
        id: 'teknologi',
        label: 'Teknologi',
        icon: 'fa-microchip',
        color: '#70a1ff',
        description:
            'AI, NVIDIA, semikonduktor, teknologi dan perusahaan teknologi',
    },
];