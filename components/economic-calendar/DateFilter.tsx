'use client';

import { useEffect, useState } from 'react';
import {
    getPresetRange,
    toInputDate,
    formatDisplayDate,
} from '@/lib/economic-calendar/utils';
import type { RangePreset } from './types';

interface DateFilterProps {
    onApply: (from: Date, to: Date) => void;
    isLoading?: boolean;
}

const PRESETS: { value: RangePreset; label: string; icon: string }[] = [
    { value: 'today', label: 'Hari Ini', icon: 'fa-calendar-day' },
    { value: 'week', label: 'Minggu Ini', icon: 'fa-calendar-week' },
    { value: '7days', label: '7 Hari ke Depan', icon: 'fa-calendar-plus' },
    { value: '30days', label: '30 Hari ke Depan', icon: 'fa-calendar-alt' },
    { value: 'prev7', label: '7 Hari Lalu', icon: 'fa-history' },
    { value: 'thismonth', label: 'Bulan Ini', icon: 'fa-calendar' },
];

export default function DateFilter({ onApply, isLoading }: DateFilterProps) {
    const [preset, setPreset] = useState<RangePreset>('today');
    const [from, setFrom] = useState<Date>(new Date());
    const [to, setTo] = useState<Date>(new Date());

    useEffect(() => {
        const { from: f, to: t } = getPresetRange('today');
        setFrom(f);
        setTo(t);
        onApply(f, t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const applyPreset = (p: RangePreset) => {
        setPreset(p);
        if (p === 'custom') return;
        const { from: f, to: t } = getPresetRange(p);
        setFrom(f);
        setTo(t);
        onApply(f, t);
    };

    const handleManualChange = (field: 'from' | 'to', value: string) => {
        if (!value) return;
        const date =
            field === 'from'
                ? new Date(value + 'T00:00:00')
                : new Date(value + 'T23:59:59');
        if (field === 'from') setFrom(date);
        else setTo(date);
        setPreset('custom');
    };

    const handleApply = () => {
        if (from > to) {
            alert('Tanggal "Dari" tidak boleh lebih besar dari "Sampai".');
            return;
        }
        onApply(from, to);
    };

    const handleReset = () => {
        applyPreset('today');
    };

    const durationDays =
        Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    return (
        <div className="bg-tv-card border border-tv-border rounded-2xl p-5 mb-5">
            <div className="flex items-center gap-2 mb-4">
                <i className="fas fa-filter text-tv-accent" />
                <h3 className="font-semibold text-white">Filter Tanggal</h3>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {PRESETS.map((p) => (
                    <button
                        key={p.value}
                        onClick={() => applyPreset(p.value)}
                        className={`date-chip px-3 py-1.5 rounded-full text-xs font-medium border transition ${preset === p.value
                            ? 'bg-tv-accent/15 border-tv-accent text-tv-accent'
                            : 'bg-tv-card border-tv-border text-slate-400 hover:text-white hover:border-tv-accent/50'
                            }`}
                    >
                        <i className={`fas ${p.icon} mr-1`} />
                        {p.label}
                    </button>
                ))}
                <button
                    onClick={() => setPreset('custom')}
                    className={`date-chip px-3 py-1.5 rounded-full text-xs font-medium border transition ${preset === 'custom'
                        ? 'bg-tv-accent/15 border-tv-accent text-tv-accent'
                        : 'bg-tv-card border-tv-border text-slate-400 hover:text-white hover:border-tv-accent/50'
                        }`}
                >
                    <i className="fas fa-sliders-h mr-1" />
                    Custom
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                    <label className="block text-xs text-slate-400 mb-1.5">
                        <i className="fas fa-play text-tv-accent mr-1" />
                        Dari Tanggal
                    </label>
                    <input
                        type="date"
                        value={toInputDate(from)}
                        onChange={(e) => handleManualChange('from', e.target.value)}
                        className="w-full bg-tv-bg border border-tv-border rounded-lg px-3 py-2 text-sm text-white focus:border-tv-accent focus:outline-none focus:ring-1 focus:ring-tv-accent/50 transition"
                    />
                </div>
                <div>
                    <label className="block text-xs text-slate-400 mb-1.5">
                        <i className="fas fa-stop text-tv-accent mr-1" />
                        Sampai Tanggal
                    </label>
                    <input
                        type="date"
                        value={toInputDate(to)}
                        onChange={(e) => handleManualChange('to', e.target.value)}
                        className="w-full bg-tv-bg border border-tv-border rounded-lg px-3 py-2 text-sm text-white focus:border-tv-accent focus:outline-none focus:ring-1 focus:ring-tv-accent/50 transition"
                    />
                </div>
                <div className="flex items-end">
                    <button
                        onClick={handleApply}
                        disabled={isLoading}
                        className="w-full px-4 py-2 rounded-lg text-sm font-medium bg-tv-accent text-white hover:bg-tv-accent/90 transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <i className="fas fa-spinner animate-spin" />
                        ) : (
                            <i className="fas fa-search" />
                        )}
                        Terapkan Filter
                    </button>
                </div>
                <div className="flex items-end">
                    <button
                        onClick={handleReset}
                        disabled={isLoading}
                        className="w-full px-4 py-2 rounded-lg text-sm font-medium border border-tv-border bg-tv-card text-slate-300 hover:border-tv-accent/50 hover:text-white transition flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                        <i className="fas fa-redo" />
                        Reset
                    </button>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-tv-border flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <i className="fas fa-info-circle text-tv-accent" />
                <span>
                    Rentang aktif:{' '}
                    <strong className="text-white">
                        {formatDisplayDate(from)} → {formatDisplayDate(to)}
                    </strong>
                </span>
                <span className="text-slate-500">({durationDays} hari)</span>
            </div>
        </div>
    );
}