import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

const HeroSection = () => {
    return (
        <section style={{
            padding: '8rem 0 6rem',
            background: 'linear-gradient(to bottom, white, var(--bg-subtle))',
            textAlign: 'center'
        }}>
            <div className="container">
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: 'rgba(79, 70, 229, 0.1)',
                        color: 'var(--primary)',
                        borderRadius: '100px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        marginBottom: '1.5rem'
                    }}>
                        <span style={{ display: 'flex', width: '8px', height: '8px', borderRadius: '50%', background: 'currentColor' }}></span>
                        New Academic Year 2026 Ready
                    </div>

                    <h1 style={{
                        fontSize: '3.5rem',
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em',
                        fontWeight: 800,
                        marginBottom: '1.5rem',
                        color: 'var(--text-main)'
                    }}>
                        Manage Your University <br />
                        <span style={{ color: 'var(--primary)' }}>With Absolute Ease</span>
                    </h1>

                    <p style={{
                        fontSize: '1.25rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '2.5rem',
                        lineHeight: 1.6
                    }}>
                        The all-in-one ERP solution for modern educational institutions.
                        Streamline administration, student tracking, and faculty management in one unified platform.
                    </p>

                    <div className="flex justify-center gap-4" style={{ marginBottom: '3rem' }}>
                        <Link href="/login" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>
                            Get Started <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                        </Link>
                        <button className="btn btn-outline" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>
                            View Demo
                        </button>
                    </div>

                    <div className="flex justify-center gap-8" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        <div className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-primary" /> 99.9% Uptime
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-primary" /> Secure & Compliant
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-primary" /> 24/7 Support
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
