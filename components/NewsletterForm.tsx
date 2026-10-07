'use client';

import { useState } from 'react';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        setMessage('');

        try {
            // Simulasi API call — ganti dengan endpoint Anda
            await new Promise((resolve) => setTimeout(resolve, 800));

            setStatus('success');
            setMessage('Terima kasih! Cek inbox Anda untuk konfirmasi.');
            setEmail('');

            // Reset pesan setelah 4 detik
            setTimeout(() => {
                setStatus('idle');
                setMessage('');
            }, 4000);
        } catch {
            setStatus('error');
            setMessage('Gagal subscribe. Silakan coba lagi.');
        }
    };

    const isLoading = status === 'loading';

    return (
        <>
            <form
                className="flex flex-col gap-2 sm:flex-row"
                onSubmit={handleSubmit}
            >
                <div className="relative flex-1">
                    <i className="fas fa-envelope pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-za-text-dim" />
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        placeholder="nama@email.com"
                        className="w-full rounded-xl border border-za-border bg-za-bg/60 py-3 pl-10 pr-4 text-sm text-white placeholder:text-za-text-dim focus:border-za-accent focus:outline-none focus:ring-1 focus:ring-za-accent/40 transition disabled:opacity-60"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    <span className="inline-flex items-center gap-2">
                        {isLoading ? (
                            <>
                                <i className="fas fa-spinner animate-spin text-xs" />
                                Loading...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-paper-plane text-xs" />
                                Subscribe
                            </>
                        )}
                    </span>
                </button>
            </form>

            {message && (
                <p
                    className={`mt-3 text-[11px] ${status === 'success'
                        ? 'text-za-success'
                        : status === 'error'
                            ? 'text-za-danger'
                            : 'text-za-text-dim'
                        }`}
                >
                    <i
                        className={`fas ${status === 'success'
                            ? 'fa-circle-check'
                            : status === 'error'
                                ? 'fa-circle-exclamation'
                                : 'fa-circle-info'
                            } mr-1.5`}
                    />
                    {message}
                </p>
            )}
        </>
    );
}