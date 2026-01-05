'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import { User, Book, Clock, Award } from 'lucide-react';

import { useRouter } from 'next/navigation';

const StudentDashboard = () => {
    const router = useRouter();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Auth Check
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token || role !== 'student') {
            router.push('/login');
            return;
        }

        // Simulate API fetch
        const fetchData = async () => {
            await new Promise(resolve => setTimeout(resolve, 800));
            setStudent({
                name: 'Alex Johnson',
                id: 'STU-2026-001',
                department: 'Computer Science',
                semester: '6th',
                attendance: 87,
                cgpa: 3.8,
                courses: [
                    { code: 'CS301', name: 'Data Structures', instructor: 'Dr. Smith', grade: 'A', attendance: '92%' },
                    { code: 'CS302', name: 'Database Systems', instructor: 'Prof. Doe', grade: 'B+', attendance: '85%' },
                    { code: 'CS303', name: 'Web Engineering', instructor: 'Ms. Lee', grade: 'A-', attendance: '88%' },
                    { code: 'CS304', name: 'Operating Systems', instructor: 'Dr. Brown', grade: 'A', attendance: '90%' },
                ]
            });
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div className="spinner" style={{
                            width: '40px',
                            height: '40px',
                            border: '4px solid var(--bg-subtle)',
                            borderTop: '4px solid var(--primary)',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            margin: '0 auto 1rem'
                        }}></div>
                        <p className="text-secondary">Loading dashboard...</p>
                    </div>
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50" style={{ background: 'var(--bg-main)' }}>
            <Navbar />

            <main className="container" style={{ padding: '2rem 1.5rem 4rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 className="font-bold" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Student Dashboard</h1>
                    <p className="text-secondary">Welcome back, {student.name}</p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                }}>
                    <div className="card flex items-center gap-4">
                        <div style={{ padding: '1rem', background: '#EEF2FF', borderRadius: '12px', color: 'var(--primary)' }}>
                            <User size={24} />
                        </div>
                        <div>
                            <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Student ID</p>
                            <p className="font-bold">{student.id}</p>
                        </div>
                    </div>

                    <div className="card flex items-center gap-4">
                        <div style={{ padding: '1rem', background: '#F0FDF4', borderRadius: '12px', color: '#16A34A' }}>
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Attendance Output</p>
                            <p className="font-bold">{student.attendance}%</p>
                        </div>
                    </div>

                    <div className="card flex items-center gap-4">
                        <div style={{ padding: '1rem', background: '#FFF7ED', borderRadius: '12px', color: '#EA580C' }}>
                            <Award size={24} />
                        </div>
                        <div>
                            <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Current CGPA</p>
                            <p className="font-bold">{student.cgpa}</p>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                    {/* Profile Card */}
                    <div className="card">
                        <h3 className="font-bold" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Book size={20} /> Academic Profile
                        </h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between" style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                                <span className="text-secondary">Department</span>
                                <span className="font-medium">{student.department}</span>
                            </div>
                            <div className="flex justify-between" style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                                <span className="text-secondary">Semester</span>
                                <span className="font-medium">{student.semester}</span>
                            </div>
                            <div className="flex justify-between" style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                                <span className="text-secondary">Status</span>
                                <span className="font-bold" style={{ color: '#16A34A' }}>Active</span>
                            </div>
                        </div>
                    </div>

                    {/* Courses Table */}
                    <div className="card" style={{ gridColumn: 'span 2' }}>
                        <h3 className="font-bold" style={{ marginBottom: '1.5rem' }}>Current Courses</h3>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                                        <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Code</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Course Name</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Instructor</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Attendance</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {student.courses.map((course, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid var(--border)' }}>
                                            <td style={{ padding: '1rem', fontWeight: 500 }}>{course.code}</td>
                                            <td style={{ padding: '1rem' }}>{course.name}</td>
                                            <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{course.instructor}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{
                                                    padding: '0.25rem 0.75rem',
                                                    background: '#F0FDF4',
                                                    color: '#16A34A',
                                                    borderRadius: '100px',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 500
                                                }}>
                                                    {course.attendance}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem', fontWeight: 600 }}>{course.grade}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default StudentDashboard;
