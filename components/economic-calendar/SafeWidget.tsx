'use client';

import { useEffect, useState } from 'react';

interface SafeWidgetProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export default function SafeWidget({ children, fallback }: SafeWidgetProps) {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const handleError = (e: ErrorEvent) => {
            // Suppress error TradingView yang tidak fatal
            if (
                e.message?.includes('contentWindow') ||
                e.message?.includes('Cannot listen to the event')
            ) {
                e.preventDefault();
            }
        };

        window.addEventListener('error', handleError);
        return () => window.removeEventListener('error', handleError);
    }, []);

    if (hasError) return <>{fallback}</>;

    return <>{children}</>;
}