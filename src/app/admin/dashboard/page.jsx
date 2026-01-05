'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import { Users, Book, BarChart2, Plus } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="card flex items-center gap-4">
        <div style={{
            padding: '1rem',
            backgroundColor: color === 'blue' ? '#EFF6FF' : color === 'green' ? '#F0FDF4' : '#FFF7ED',
            color: color === 'blue' ? '#3B82F6' : color === 'green' ? '#16A34A' : '#F97316',
            borderRadius: '12px'
        }}>
            <Icon size={24} />
        </div>
        <div>
            <p className="text-secondary" style={{ fontSize: '0.875rem' }}>{title}</p>
            <p className="font-bold" style={{ fontSize: '1.5rem' }}>{value}</p>
        </div>
    </div>
);

import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
    const router = useRouter();
    const [activeView, setActiveView] = useState('overview');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token || role !== 'admin') {
            router.push('/login');
        } else {
            setLoading(false);
        }
    }, [router]);

    if (loading) return null;

    return (
        <div className="flex flex-col min-h-screen" style={{ background: 'var(--bg-main)' }}>
            <Navbar />

            <main className="container" style={{ padding: '2rem 1.5rem 4rem' }}>
                <div className="flex justify-between items-end" style={{ marginBottom: '2rem' }}>
                    <div>
                        <h1 className="font-bold" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Admin Portal</h1>
                        <p className="text-secondary">System Overview & Management</p>
                    </div>
                    <button className="btn btn-primary">
                        <Plus size={18} style={{ marginRight: '0.5rem' }} /> Create New User
                    </button>
                </div>

                {/* Stats Row */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '3rem'
                }}>
                    <StatCard title="Total Students" value="2,845" icon={Users} color="blue" />
                    <StatCard title="Total Faculty" value="142" icon={Users} color="green" />
                    <StatCard title="Active Courses" value="86" icon={Book} color="orange" />
                    <StatCard title="System Load" value="12%" icon={BarChart2} color="blue" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
                    {/* Sidebar Menu */}
                    <div className="card" style={{ padding: '1rem', height: 'fit-content' }}>
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => setActiveView('overview')}
                                className={`text-left p-3 rounded-md transition-colors ${activeView === 'overview' ? 'bg-indigo-50 text-primary font-medium' : 'text-secondary hover:bg-slate-50'}`}
                                style={{
                                    background: activeView === 'overview' ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                                    color: activeView === 'overview' ? 'var(--primary)' : 'inherit'
                                }}
                            >
                                Overview
                            </button>
                            <button className="text-left p-3 rounded-md text-secondary hover:bg-slate-50">User Management</button>
                            <button className="text-left p-3 rounded-md text-secondary hover:bg-slate-50">Course Allocation</button>
                            <button className="text-left p-3 rounded-md text-secondary hover:bg-slate-50">System Settings</button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="card">
                        <h3 className="font-bold" style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Recent Activity</h3>

                        <div className="flex flex-col gap-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex justify-between items-center" style={{
                                    paddingBottom: '1rem',
                                    borderBottom: i !== 5 ? '1px solid var(--border)' : 'none'
                                }}>
                                    <div className="flex items-center gap-4">
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: i % 2 === 0 ? '#16A34A' : '#3B82F6' }}></div>
                                        <div>
                                            <p className="font-medium">User Created</p>
                                            <p className="text-secondary text-sm">New student profile registered via portal</p>
                                        </div>
                                    </div>
                                    <span className="text-secondary text-sm">2 hours ago</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminDashboard;
