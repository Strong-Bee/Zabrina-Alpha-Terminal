'use client';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const btnBase =
        'min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition flex items-center justify-center';
    const btnActive = `${btnBase} bg-tv-accent text-white`;
    const btnInactive = `${btnBase} bg-tv-card border border-tv-border text-slate-300 hover:border-tv-accent/50 hover:text-white`;
    const btnDisabled = `${btnBase} bg-tv-card/50 border border-tv-border/50 text-slate-600 cursor-not-allowed`;

    const pages: (number | 'dots')[] = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

    if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('dots');
    }
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages) {
        if (end < totalPages - 1) pages.push('dots');
        pages.push(totalPages);
    }

    return (
        <div className="flex items-center gap-2">
            <button
                className={currentPage === 1 ? btnDisabled : btnInactive}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <i className="fas fa-chevron-left" />
            </button>

            {pages.map((p, i) =>
                p === 'dots' ? (
                    <span key={`dots-${i}`} className="text-slate-500 px-2">
                        …
                    </span>
                ) : (
                    <button
                        key={p}
                        className={p === currentPage ? btnActive : btnInactive}
                        onClick={() => onPageChange(p)}
                    >
                        {p}
                    </button>
                )
            )}

            <button
                className={currentPage === totalPages ? btnDisabled : btnInactive}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                <i className="fas fa-chevron-right" />
            </button>
        </div>
    );
}