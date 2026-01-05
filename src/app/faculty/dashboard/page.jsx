'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import { BookOpen, Users, CheckSquare, Upload } from 'lucide-react';

import { useRouter } from 'next/navigation';

const FacultyDashboard = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('courses');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token || role !== 'faculty') {
            router.push('/login');
        } else {
            setLoading(false);
        }
    }, [router]);

    if (loading) return null; // Or a spinner

    // Hardcoded Faculty Data
    const facultyName = "Dr. Sarah Smith";
    const courses = [
        { id: 1, code: 'CS301', name: 'Data Structures', students: 45, nextClass: 'Mon 10:00 AM' },
        { id: 2, code: 'CS450', name: 'Advanced Algorithms', students: 32, nextClass: 'Tue 02:00 PM' },
        { id: 3, code: 'CS101', name: 'Intro to Programming', students: 120, nextClass: 'Wed 09:00 AM' },
    ];

    return (
        <div className="flex flex-col min-h-screen" style={{ background: 'var(--bg-main)' }}>
            <Navbar />

            <main className="container" style={{ padding: '2rem 1.5rem 4rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 className="font-bold" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Faculty Dashboard</h1>
                    <p className="text-secondary">Welcome, {facultyName}</p>
                </div>

                {/* Quick Actions Row */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => setActiveTab('courses')}
                        className={`btn ${activeTab === 'courses' ? 'btn-primary' : 'btn-outline'}`}
                    >
                        <BookOpen size={18} style={{ marginRight: '0.5rem' }} /> My Courses
                    </button>
                    <button
                        onClick={() => setActiveTab('attendance')}
                        className={`btn ${activeTab === 'attendance' ? 'btn-primary' : 'btn-outline'}`}
                    >
                        <CheckSquare size={18} style={{ marginRight: '0.5rem' }} /> Mark Attendance
                    </button>
                    <button
                        onClick={() => setActiveTab('grades')}
                        className={`btn ${activeTab === 'grades' ? 'btn-primary' : 'btn-outline'}`}
                    >
                        <Upload size={18} style={{ marginRight: '0.5rem' }} /> Upload Grades
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="card">
                    {activeTab === 'courses' && (
                        <div>
                            <h2 className="font-bold" style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Assigned Courses</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                {courses.map(course => (
                                    <div key={course.id} style={{
                                        border: '1px solid var(--border)',
                                        borderRadius: 'var(--radius-md)',
                                        padding: '1.25rem',
                                        background: 'var(--bg-subtle)'
                                    }}>
                                        <div className="flex justify-between items-start" style={{ marginBottom: '1rem' }}>
                                            <span style={{
                                                background: 'white',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '100px',
                                                fontSize: '0.8rem',
                                                fontWeight: 600,
                                                border: '1px solid var(--border)'
                                            }}>
                                                {course.code}
                                            </span>
                                            <Users size={20} className="text-secondary" />
                                        </div>
                                        <h3 className="font-bold" style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{course.name}</h3>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                            <p>Students: {course.students}</p>
                                            <p>Next Class: {course.nextClass}</p>
                                        </div>
                                        <button className="btn btn-outline" style={{ width: '100%', marginTop: '1rem', fontSize: '0.9rem' }}>
                                            View Details
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'attendance' && (
                        <div>
                            <h2 className="font-bold" style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Mark Attendance</h2>
                            <form className="flex flex-col gap-4" style={{ maxWidth: '400px' }}>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Select Course</label>
                                    <select className="w-full p-2 border rounded-md" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                                        <option>Select a course...</option>
                                        {courses.map(c => <option key={c.id} value={c.id}>{c.code} - {c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date</label>
                                    <input type="date" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }} />
                                </div>
                                <button className="btn btn-primary">Proceed to Student List</button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'grades' && (
                        <div>
                            <h2 className="font-bold" style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Upload Grades</h2>
                            <div style={{
                                border: '2px dashed var(--border)',
                                borderRadius: 'var(--radius-lg)',
                                padding: '3rem',
                                textAlign: 'center',
                                background: 'var(--bg-subtle)'
                            }}>
                                <Upload size={48} style={{ margin: '0 auto 1rem', color: 'var(--text-muted)' }} />
                                <p className="font-medium">Drag and drop CSV file here</p>
                                <p className="text-secondary text-sm">or click to browse</p>
                                <button className="btn btn-outline" style={{ marginTop: '1rem' }}>Select File</button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default FacultyDashboard;
