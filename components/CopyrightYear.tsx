'use client';

import { useEffect, useState } from 'react';

export default function CopyrightYear() {
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    if (year === null) {
        return <span suppressHydrationWarning>2026</span>;
    }

    return <>{year}</>;
}