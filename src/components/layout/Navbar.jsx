import React from 'react';
import { Link } from 'react-router-dom';
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
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, fontSize: '1.25rem' }}>
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
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-secondary hover:text-primary">Features</Link>
                    <Link to="/" className="text-secondary hover:text-primary">About</Link>
                    <Link to="/" className="text-secondary hover:text-primary">Contact</Link>

                    <Link to="/login" className="btn btn-primary">
                        Student / Staff Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
