import { getCountryIso } from '@/lib/economic-calendar/utils';

interface FlagIconProps {
    code: string;
    size?: 'sm' | 'md';
    wrapper?: boolean;
}

export default function FlagIcon({ code, size = 'md', wrapper = false }: FlagIconProps) {
    const iso = getCountryIso(code);
    const sizeClass = size === 'sm' ? 'flag-sm' : '';

    const flag =
        iso === 'xx' ? (
            <span className="inline-flex items-center justify-center w-8 h-6 bg-slate-700 rounded text-xs text-slate-400">
                {code.substring(0, 2)}
            </span>
        ) : (
            <span className={`fi fi-${iso} ${sizeClass}`} />
        );

    if (wrapper) {
        return <div className="flag-wrapper">{flag}</div>;
    }
    return flag;
}