"use client";
import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { GraduationCap, LayoutDashboard, Calendar, CreditCard, ClipboardList, Users, Settings, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';

const NavbarContent = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentView = searchParams.get('view') || 'overview';
    const [role, setRole] = useState(null);

    useEffect(() => {
        setRole(localStorage.getItem('role'));
    }, []);

    const isDashboard = pathname.includes('/dashboard');

    const getNavLinks = () => {
        if (!isDashboard) {
            return (
                <>
                    <Link href="/#features" className={styles.link}>Features</Link>
                    <Link href="/#solutions" className={styles.link}>Solutions</Link>
                    <Link href="/#pricing" className={styles.link}>Pricing</Link>
                    <Link href="/#about" className={styles.link}>About</Link>
                </>
            );
        }

        if (role === 'student') {
            return (
                <>
                    <NavLink href="/student/dashboard" view="overview" icon={LayoutDashboard}>Dashboard</NavLink>
                    <NavLink href="/student/dashboard" view="schedule" icon={Calendar}>Schedule</NavLink>
                    <NavLink href="/student/dashboard" view="assignments" icon={ClipboardList}>Assignments</NavLink>
                    <NavLink href="/student/dashboard" view="fees" icon={CreditCard}>Fees</NavLink>
                    <NavLink href="/student/dashboard" view="library" icon={BookOpen}>Library</NavLink>
                </>
            );
        }

        if (role === 'faculty') {
            return (
                <>
                    <NavLink href="/faculty/dashboard" view="courses" icon={LayoutDashboard}>Courses</NavLink>
                    <NavLink href="/faculty/dashboard" view="attendance" icon={Users}>Attendance</NavLink>
                    <NavLink href="/faculty/dashboard" view="grades" icon={ClipboardList}>Grades</NavLink>
                    <NavLink href="/faculty/dashboard" view="adviser" icon={BookOpen}>Adviser</NavLink>
                </>
            );
        }

        if (role === 'admin') {
            return (
                <>
                    <NavLink href="/admin/dashboard" view="overview" icon={LayoutDashboard}>Admin Console</NavLink>
                    <NavLink href="/admin/dashboard" view="users" icon={Users}>Directory</NavLink>
                    <NavLink href="/admin/dashboard" view="courses" icon={BookOpen}>Academic</NavLink>
                    <NavLink href="/admin/dashboard" view="settings" icon={Settings}>General</NavLink>
                </>
            );
        }

        return null;
    };

    const NavLink = ({ href, view, icon: Icon, children }) => {
        const isActive = currentView === view;
        return (
            <Link
                href={`${href}?view=${view}`}
                className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
            >
                <Icon size={16} className={styles.navIcon} />
                {children}
            </Link>
        );
    };

    return (
        <motion.header
            className={styles.navbarWrapper}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <GraduationCap size={28} className={styles.logoIcon} />
                    <span>Yenepoya <span style={{ color: 'var(--yen-green)' }}>ERP</span></span>
                </Link>

                <nav className={styles.navLinks}>
                    {getNavLinks()}
                </nav>

                <div className={styles.ctaGroup}>
                    {role ? (
                        <>
                            <Link
                                href={`/${role}/dashboard`}
                                className={styles.signInBtn}
                            >
                                {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
                            </Link>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('role');
                                    window.location.href = '/login';
                                }}
                                className={styles.getStartedBtn}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className={styles.signInBtn}>
                                Sign in
                            </Link>
                            <Link href="/login" className={styles.getStartedBtn}>
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </motion.header>
    );
};

const Navbar = () => (
    <Suspense fallback={<header className={styles.navbarWrapper} style={{ minHeight: 'var(--navbar-height)' }} />}>
        <NavbarContent />
    </Suspense>
);

export default Navbar;
