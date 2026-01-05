'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import styles from './Login.module.css';

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
        <div className={styles.pageWrapper}>
            <Navbar />

            <main className={styles.main}>
                <div className={styles.loginCard}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Welcome Back</h1>
                        <p className={styles.subtitle}>Sign in to access your portal</p>
                    </div>

                    {error && (
                        <div className={styles.errorAlert}>
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Email Address</label>
                            <div className={styles.inputWrapper}>
                                <Mail size={18} className={styles.inputIcon} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@university.edu"
                                    className={styles.input}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Password</label>
                            <div className={styles.inputWrapper}>
                                <Lock size={18} className={styles.inputIcon} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className={styles.input}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                            {!loading && <ArrowRight size={16} />}
                        </button>
                    </form>

                    <div className={styles.demoBox}>
                        <p className={styles.demoTitle}>Demo Credentials</p>
                        <div className={styles.demoList}>
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
