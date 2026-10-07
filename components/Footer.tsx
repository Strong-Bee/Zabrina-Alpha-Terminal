import Link from 'next/link';
import CopyrightYear from './CopyrightYear';
import NewsletterForm from './NewsletterForm';

const FOOTER_SECTIONS = [
    {
        title: 'Produk',
        links: [
            { label: 'Kalender Ekonomi', href: '/economic-calendar' },
            { label: 'Data GDP', href: '/economic-calendar' },
            { label: 'Market Analytics', href: '/#features' },
            { label: 'Alpha Signals', href: '/#features' },
        ],
    },
    {
        title: 'Sumber Daya',
        links: [
            { label: 'Dokumentasi', href: '/#docs' },
            { label: 'API Reference', href: '/#api' },
            { label: 'Status Sistem', href: '/#status' },
            { label: 'Changelog', href: '/#changelog' },
        ],
    },
    {
        title: 'Perusahaan',
        links: [
            { label: 'Tentang Kami', href: '/#about' },
            { label: 'Karier', href: '/#careers' },
            { label: 'Kontak', href: '/#contact' },
            { label: 'Blog', href: '/#blog' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { label: 'Syarat Layanan', href: '/#terms' },
            { label: 'Kebijakan Privasi', href: '/#privacy' },
            { label: 'Keamanan', href: '/#security' },
            { label: 'Disclaimer', href: '/#disclaimer' },
        ],
    },
];

const SOCIALS = [
    { icon: 'fa-x-twitter', href: 'https://x.com', label: 'X (Twitter)' },
    { icon: 'fa-discord', href: 'https://discord.com', label: 'Discord' },
    { icon: 'fa-github', href: 'https://github.com', label: 'GitHub' },
    { icon: 'fa-telegram', href: 'https://telegram.org', label: 'Telegram' },
    { icon: 'fa-youtube', href: 'https://youtube.com', label: 'YouTube' },
];

export default function Footer() {
    return (
        <footer className="relative mt-24 border-t border-za-border/60 bg-za-bg">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-za-accent/40 to-transparent" />
            <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-za-accent/5 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
                {/* ===== TOP: Brand + Newsletter ===== */}
                <div className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
                    {/* Brand column */}
                    <div className="lg:col-span-5">
                        <Link href="/" className="group mb-5 inline-flex items-center gap-3">
                            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-za-accent via-za-accent-2 to-za-accent-3 shadow-[0_0_30px_rgba(0,212,255,0.35)]">
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-za-accent to-za-accent-3 opacity-60 blur-lg transition-opacity group-hover:opacity-90" />
                                <i className="fas fa-bolt relative text-base text-white" />
                            </div>
                            <div className="leading-tight">
                                <div className="flex items-center gap-1.5 font-semibold tracking-tight text-white">
                                    <span>ZABRINA</span>
                                    <span className="text-za-accent">ALPHA</span>
                                </div>
                                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-za-text-dim">
                                    TERMINAL · v2.4.1
                                </div>
                            </div>
                        </Link>

                        <p className="mb-6 max-w-md text-sm leading-relaxed text-za-text-muted">
                            Terminal trading profesional yang menyatukan data ekonomi global,
                            kalender event real-time, dan analitik pasar dalam satu dashboard
                            terintegrasi.
                        </p>

                        {/* Status badges */}
                        <div className="mb-6 flex flex-wrap gap-2">
                            <div className="inline-flex items-center gap-2 rounded-full border border-za-border bg-za-surface/60 px-3 py-1.5 backdrop-blur-sm">
                                <span className="status-dot-live" />
                                <span className="font-mono text-[10px] font-medium tracking-wider text-za-success">
                                    ALL SYSTEMS OPERATIONAL
                                </span>
                            </div>
                        </div>

                        {/* Socials */}
                        <div className="flex flex-wrap gap-2">
                            {SOCIALS.map((s) => (
                                <a
                                    key={s.icon}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="group inline-flex h-9 w-9 items-center justify-center rounded-lg border border-za-border bg-za-surface/60 text-za-text-muted backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-za-accent/50 hover:bg-za-accent/5 hover:text-za-accent"
                                >
                                    <i className={`fa-brands ${s.icon} text-sm`} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter — pakai Client Component */}
                    <div className="lg:col-span-7 lg:pl-10">
                        <div className="border-gradient rounded-2xl p-6">
                            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-za-accent">
                                // Market Newsletter
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-white">
                                Dapatkan insight pasar mingguan
                            </h3>
                            <p className="mb-5 max-w-lg text-sm text-za-text-muted">
                                Analisis makro, agenda ekonomi penting, dan sinyal trading
                                langsung ke inbox Anda. Tanpa spam.
                            </p>

                            {/* 👇 Ganti form dengan Client Component */}
                            <NewsletterForm />

                            <p className="mt-3 text-[11px] text-za-text-dim">
                                Dengan subscribe Anda menyetujui{' '}
                                <Link
                                    href="/#privacy"
                                    className="text-za-accent-2 hover:underline"
                                >
                                    Kebijakan Privasi
                                </Link>{' '}
                                kami.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ===== MIDDLE: Link columns ===== */}
                <div className="mb-14 grid grid-cols-2 gap-8 border-t border-za-border/60 pt-12 md:grid-cols-4">
                    {FOOTER_SECTIONS.map((section) => (
                        <div key={section.title}>
                            <h4 className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-za-text-dim">
                                {section.title}
                            </h4>
                            <ul className="space-y-2.5">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="group inline-flex items-center gap-1.5 text-sm text-za-text-muted transition hover:text-white"
                                        >
                                            <span className="h-px w-0 bg-za-accent transition-all duration-300 group-hover:w-3" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* ===== BOTTOM: Legal + Credits ===== */}
                <div className="flex flex-col gap-4 border-t border-za-border/60 pt-8 text-xs text-za-text-dim md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span className="flex items-center gap-2">
                            <i className="fas fa-bolt text-za-accent" />
                            © <CopyrightYear /> ZABRINA ALPHA TERMINAL
                        </span>
                        <span className="hidden h-3 w-px bg-za-border md:block" />
                        <span className="font-mono">
                            <i className="fas fa-database mr-1.5 text-za-accent-2" />
                            Data:{' '}
                            <a
                                href="https://www.tradingview.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-za-accent-2 hover:underline"
                            >
                                TradingView
                            </a>{' '}
                            ·{' '}
                            <a
                                href="https://data.worldbank.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-za-accent-2 hover:underline"
                            >
                                World Bank
                            </a>
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 font-mono">
                        <span className="inline-flex items-center gap-1.5">
                            <i className="fas fa-shield-halved text-za-success" />
                            Secure Connection
                        </span>
                        <span className="hidden h-3 w-px bg-za-border sm:block" />
                        <span className="inline-flex items-center gap-1.5">
                            <i className="fas fa-circle-check text-za-success" />
                            GDPR Compliant
                        </span>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-8 rounded-xl border border-za-border/60 bg-za-surface/40 p-4 text-[11px] leading-relaxed text-za-text-dim">
                    <div className="mb-1 flex items-center gap-2 font-medium text-za-warning">
                        <i className="fas fa-triangle-exclamation text-xs" />
                        Disclaimer Risiko
                    </div>
                    Trading forex, komoditas, dan instrumen keuangan lainnya memiliki
                    tingkat risiko tinggi dan dapat mengakibatkan kerugian melebihi
                    modal Anda. Data dan analisis yang disajikan di ZABRINA ALPHA
                    TERMINAL bersifat informatif dan bukan merupakan nasihat investasi.
                    Selalu lakukan riset mandiri dan konsultasikan dengan penasihat
                    keuangan yang berlisensi sebelum mengambil keputusan trading.
                </div>
            </div>
        </footer>
    );
}