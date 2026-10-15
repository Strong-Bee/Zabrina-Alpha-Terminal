'use client';

import { useEffect, useState } from 'react';

export default function CopyrightYear() {
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        const id = window.setTimeout(() => setYear(new Date().getFullYear()), 0);
        return () => window.clearTimeout(id);
    }, []);

    if (year === null) {
        return <span suppressHydrationWarning>2026</span>;
    }

    return <>{year}</>;
}