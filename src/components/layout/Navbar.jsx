import React from 'react';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

const Navbar = () => {
    return (
        <nav style={{
            height: 'var(--header-height)',
            borderBottom: '1px solid var(--border)',
            position: 'sticky',
            top: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            zIndex: 50
        }}>
            <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Logo */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, fontSize: '1.25rem' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'var(--primary)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <GraduationCap size={24} />
                    </div>
                    <span style={{ color: 'var(--text-main)' }}>UniERP</span>
                </Link>

                {/* Desktop Nav */}
                <div className="flex items-center gap-4">
                    <Link href="/student/dashboard" className="text-sm font-medium hover:text-primary">
                        Student Demo
                    </Link>
                    <Link href="/faculty/dashboard" className="text-sm font-medium hover:text-primary">
                        Faculty Demo
                    </Link>
                    <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border)', margin: '0 0.5rem' }}></div>
                    <Link href="/login" className="btn btn-primary">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
