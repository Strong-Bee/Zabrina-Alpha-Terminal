import type { EventStatus, EconomicEvent } from '@/components/economic-calendar/types';

// ============================================================
// COUNTRY MAPPING
// ============================================================

export const COUNTRY_NAMES: Record<string, string> = {
    US: 'Amerika Serikat', CN: 'Tiongkok', JP: 'Jepang', DE: 'Jerman',
    GB: 'Inggris', FR: 'Prancis', IN: 'India', BR: 'Brasil',
    IT: 'Italia', CA: 'Kanada', KR: 'Korea Selatan', RU: 'Rusia',
    AU: 'Australia', MX: 'Meksiko', ID: 'Indonesia', TR: 'Turki',
    SA: 'Arab Saudi', AR: 'Argentina', ZA: 'Afrika Selatan', ERL: 'Euro Area',
};

export const COUNTRY_TO_ISO: Record<string, string> = {
    US: 'us', CN: 'cn', JP: 'jp', DE: 'de', GB: 'gb',
    FR: 'fr', IN: 'in', BR: 'br', IT: 'it', CA: 'ca',
    KR: 'kr', RU: 'ru', AU: 'au', MX: 'mx', ID: 'id',
    TR: 'tr', SA: 'sa', AR: 'ar', ZA: 'za', ERL: 'eu',
};

export function getCountryName(code: string): string {
    return COUNTRY_NAMES[code] || code;
}

export function getCountryIso(code: string): string {
    return COUNTRY_TO_ISO[code] || 'xx';
}

// ============================================================
// CURRENCY FORMATTING
// ============================================================

/**
 * Format angka besar jadi ringkas:
 *  1_500_000_000_000 → "1.50 T"
 *  500_000_000       → "500.00 M"
 *  1_500_000         → "1.50 Jt"
 *  5000              → "5,000"
 */
export function formatCurrency(v: number | null | undefined): string {
    if (v == null || isNaN(v)) return '—';
    if (v >= 1e12) return (v / 1e12).toFixed(2) + ' T';
    if (v >= 1e9) return (v / 1e9).toFixed(2) + ' M';
    if (v >= 1e6) return (v / 1e6).toFixed(2) + ' Jt';
    return v.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

// ============================================================
// DATE UTILS
// ============================================================

export function toInputDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

export function formatDisplayDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

// ============================================================
// PRESET DATE RANGE
// ============================================================

export function getPresetRange(preset: string): { from: Date; to: Date } {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (preset) {
        case 'today': {
            const to = new Date(today);
            to.setHours(23, 59, 59, 999);
            return { from: today, to };
        }
        case 'week': {
            const day = today.getDay();
            const diff = day === 0 ? 6 : day - 1;
            const from = new Date(today);
            from.setDate(today.getDate() - diff);
            const to = new Date(from);
            to.setDate(from.getDate() + 6);
            to.setHours(23, 59, 59, 999);
            return { from, to };
        }
        case '7days': {
            const to = new Date(today);
            to.setDate(to.getDate() + 7);
            to.setHours(23, 59, 59, 999);
            return { from: today, to };
        }
        case '30days': {
            const to = new Date(today);
            to.setDate(to.getDate() + 30);
            to.setHours(23, 59, 59, 999);
            return { from: today, to };
        }
        case 'prev7': {
            const from = new Date(today);
            from.setDate(from.getDate() - 7);
            const to = new Date(today);
            to.setHours(23, 59, 59, 999);
            return { from, to };
        }
        case 'thismonth': {
            const from = new Date(today.getFullYear(), today.getMonth(), 1);
            const to = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            to.setHours(23, 59, 59, 999);
            return { from, to };
        }
        default:
            return { from: today, to: today };
    }
}

// ============================================================
// EVENT STATUS
// ============================================================

export function getEventStatus(event: EconomicEvent): EventStatus {
    const eventTime = new Date(event.date).getTime();
    const now = Date.now();

    if (eventTime < now) {
        const hasActual =
            event.actual !== '—' &&
            event.actual !== '' &&
            event.actual !== undefined &&
            event.actual !== null;

        const minsSinceEvent = (now - eventTime) / 60000;
        if (!hasActual && minsSinceEvent < 30) {
            return 'ongoing';
        }
        return 'released';
    }

    return 'upcoming';
}

export const STATUS_META: Record<
    EventStatus,
    {
        label: string;
        icon: string;
        color: string;
        bg: string;
        border: string;
    }
> = {
    released: {
        label: 'Sudah Rilis',
        icon: 'fa-check-circle',
        color: 'text-za-success',
        bg: 'bg-za-success/10',
        border: 'border-za-success/30',
    },
    ongoing: {
        label: 'Sedang Berlangsung',
        icon: 'fa-circle-dot',
        color: 'text-za-warning',
        bg: 'bg-za-warning/10',
        border: 'border-za-warning/30',
    },
    upcoming: {
        label: 'Akan Datang',
        icon: 'fa-clock',
        color: 'text-za-accent',
        bg: 'bg-za-accent/10',
        border: 'border-za-accent/30',
    },
};

export function formatCountdown(iso: string): string {
    try {
        const diff = new Date(iso).getTime() - Date.now();
        if (diff <= 0) return '';

        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);

        if (days > 0) return `${days}h ${hours}j`;
        if (hours > 0) return `${hours}j ${mins}m`;
        return `${mins}m`;
    } catch {
        return '';
    }
}