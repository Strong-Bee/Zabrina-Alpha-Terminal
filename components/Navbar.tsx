'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
    { href: '/', label: 'Home', icon: 'fa-house' },
    { href: '/economic-calendar', label: 'Kalender Ekonomi', icon: 'fa-calendar-alt' },
    { href: '/chart', label: 'Chart', icon: 'fa-chart-line' },
    { href: '/news', label: 'Berita', icon: 'fa-newspaper' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [clock, setClock] = useState<string>('');

    // Scroll detection for glass effect
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Live clock
    useEffect(() => {
        const tick = () => {
            const now = new Date();
            const time = now.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            });
            setClock(time);
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    // Close mobile on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        if (href.startsWith('/#')) return false;
        return pathname.startsWith(href);
    };

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
                    ? 'border-b border-za-border/60 bg-za-bg/80 backdrop-blur-xl'
                    : 'border-b border-transparent bg-transparent'
                    }`}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 md:px-8">
                    {/* ===== BRAND ===== */}
                    <Link
                        href="/"
                        className="group flex items-center gap-3"
                        aria-label="ZABRINA ALPHA TERMINAL — Home"
                    >
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-za-accent via-za-accent-2 to-za-accent-3 shadow-[0_0_24px_rgba(0,212,255,0.3)] transition-transform group-hover:scale-105">
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-za-accent to-za-accent-3 opacity-50 blur-md transition-opacity group-hover:opacity-80" />
                            <i className="fas fa-bolt relative text-sm text-white" />
                        </div>
                        <div className="leading-tight">
                            <div className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-white sm:text-base">
                                <span>ZABRINA</span>
                                <span className="text-za-accent">ALPHA</span>
                            </div>
                            <div className="hidden font-mono text-[9px] uppercase tracking-[0.25em] text-za-text-dim sm:block">
                                TERMINAL · v2.4.1
                            </div>
                        </div>
                    </Link>

                    {/* ===== DESKTOP NAV ===== */}
                    <nav className="hidden items-center gap-1 lg:flex">
                        {NAV_LINKS.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`group relative inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition ${active
                                        ? 'text-white'
                                        : 'text-za-text-muted hover:text-white'
                                        }`}
                                >
                                    <i
                                        className={`fas ${link.icon} text-[11px] transition ${active
                                            ? 'text-za-accent'
                                            : 'text-za-text-dim group-hover:text-za-accent'
                                            }`}
                                    />
                                    {link.label}

                                    {/* Active indicator */}
                                    {active && (
                                        <span className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-za-accent to-transparent" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* ===== RIGHT CLUSTER ===== */}
                    <div className="flex items-center gap-2">
                        {/* Live status (desktop) */}
                        <div className="hidden items-center gap-2 rounded-full border border-za-border bg-za-surface/60 px-3 py-1.5 backdrop-blur-sm md:flex">
                            <span className="status-dot-live" />
                            <span className="font-mono text-[10px] font-medium tracking-wider text-za-success">
                                LIVE
                            </span>
                        </div>

                        {/* Clock (desktop) */}
                        <div className="hidden items-center gap-2 rounded-full border border-za-border bg-za-surface/60 px-3 py-1.5 font-mono text-[11px] text-za-text-muted backdrop-blur-sm md:flex">
                            <i className="fas fa-clock text-[10px] text-za-accent-2" />
                            {clock}
                        </div>

                        {/* CTA */}
                        <Link
                            href="/economic-calendar"
                            className="btn-primary group hidden items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold sm:inline-flex"
                        >
                            <span className="inline-flex items-center gap-1.5">
                                <i className="fas fa-terminal text-[10px]" />
                                Buka Terminal
                            </span>
                        </Link>

                        {/* Mobile toggle */}
                        <button
                            type="button"
                            onClick={() => setMobileOpen((v) => !v)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-za-border bg-za-surface/60 text-za-text-muted transition hover:border-za-accent/50 hover:text-white lg:hidden"
                            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
                            aria-expanded={mobileOpen}
                        >
                            <i
                                className={`fas ${mobileOpen ? 'fa-xmark' : 'fa-bars'
                                    } text-sm`}
                            />
                        </button>
                    </div>
                </div>
            </header>

            {/* ===== MOBILE MENU ===== */}
            <div
                className={`fixed inset-0 z-40 lg:hidden transition ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                aria-hidden={!mobileOpen}
            >
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-za-bg/80 backdrop-blur-md transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={() => setMobileOpen(false)}
                />

                {/* Panel */}
                <div
                    className={`absolute right-0 top-0 h-full w-[85%] max-w-sm border-l border-za-border bg-za-surface shadow-elevated transition-transform duration-300 ease-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="flex h-full flex-col">
                        {/* Panel header */}
                        <div className="flex items-center justify-between border-b border-za-border px-5 py-4">
                            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-za-text-dim">
                                Navigation
                            </span>
                            <button
                                type="button"
                                onClick={() => setMobileOpen(false)}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-za-border text-za-text-muted transition hover:border-za-accent/50 hover:text-white"
                                aria-label="Tutup menu"
                            >
                                <i className="fas fa-xmark text-xs" />
                            </button>
                        </div>

                        {/* Panel links */}
                        <nav className="flex-1 overflow-y-auto p-4">
                            <ul className="space-y-1">
                                {NAV_LINKS.map((link) => {
                                    const active = isActive(link.href);
                                    return (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                onClick={() => setMobileOpen(false)}
                                                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition ${active
                                                    ? 'border-za-accent/40 bg-za-accent/5 text-white'
                                                    : 'border-transparent text-za-text-muted hover:border-za-border hover:bg-za-surface-2 hover:text-white'
                                                    }`}
                                            >
                                                <span
                                                    className={`flex h-8 w-8 items-center justify-center rounded-lg border ${active
                                                        ? 'border-za-accent/40 bg-za-accent/10'
                                                        : 'border-za-border bg-za-bg/60'
                                                        }`}
                                                >
                                                    <i
                                                        className={`fas ${link.icon} text-xs ${active
                                                            ? 'text-za-accent'
                                                            : 'text-za-text-dim'
                                                            }`}
                                                    />
                                                </span>
                                                {link.label}
                                                {active && (
                                                    <i className="fas fa-circle ml-auto text-[6px] text-za-accent" />
                                                )}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* Panel footer */}
                        <div className="border-t border-za-border p-4">
                            <div className="mb-4 flex items-center justify-between rounded-xl border border-za-border bg-za-bg/60 px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <span className="status-dot-live" />
                                    <span className="font-mono text-[10px] font-medium tracking-wider text-za-success">
                                        LIVE FEED
                                    </span>
                                </div>
                                <span className="font-mono text-[11px] text-za-text-muted">
                                    {clock}
                                </span>
                            </div>

                            <Link
                                href="/economic-calendar"
                                onClick={() => setMobileOpen(false)}
                                className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                            >
                                <span className="inline-flex items-center gap-2">
                                    <i className="fas fa-terminal text-xs" />
                                    Buka Terminal
                                    <i className="fas fa-arrow-right text-xs" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Spacer untuk fixed navbar */}
            <div className="h-[68px]" aria-hidden="true" />
        </>
    );
}