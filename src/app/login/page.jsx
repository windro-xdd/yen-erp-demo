'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Mock API call simulation
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (!email || !password) {
                throw new Error('Please fill in all fields');
            }

            let role = 'student';
            let token = 'mock-jwt-token-12345';

            if (email.includes('faculty')) role = 'faculty';
            else if (email.includes('admin')) role = 'admin';
            else if (email.includes('error')) throw new Error('Invalid credentials');

            // Store in localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
            }

            // Redirect based on role
            if (role === 'student') router.push('/student/dashboard');
            else if (role === 'faculty') router.push('/faculty/dashboard');
            else if (role === 'admin') router.push('/admin/dashboard');

        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow flex items-center justify-center" style={{ background: 'var(--bg-subtle)', padding: '2rem' }}>
                <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '2rem' }}>
                    <div className="text-center" style={{ marginBottom: '2rem' }}>
                        <h1 className="font-bold" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Welcome Back</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Sign in to access your portal</p>
                    </div>

                    {error && (
                        <div style={{
                            background: '#FEF2F2',
                            color: '#DC2626',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.875rem'
                        }}>
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@university.edu"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                                        border: '1px solid var(--border)',
                                        borderRadius: 'var(--radius-md)',
                                        outline: 'none',
                                        fontSize: '1rem'
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                                        border: '1px solid var(--border)',
                                        borderRadius: 'var(--radius-md)',
                                        outline: 'none',
                                        fontSize: '1rem'
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                            style={{ width: '100%', padding: '0.875rem', fontSize: '1rem' }}
                        >
                            {loading ? 'Signing in...' : 'Sign In'} <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                        </button>
                    </form>

                    <div className="text-center" style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        <p>Demo Credentials:</p>
                        <div className="flex flex-col gap-1 mt-2" style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                            <span>Student: student@demo.com</span>
                            <span>Faculty: faculty@demo.com</span>
                            <span>Admin: admin@demo.com</span>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LoginPage;
