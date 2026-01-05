'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import { BookOpen, Users, ChevronRight, Star, Bell, FileText, Calendar } from 'lucide-react';
import styles from '../../../styles/Dashboard.module.css';

const FacultyDashboardContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const view = searchParams.get('view') || 'courses';
    const [activeTab, setActiveTab] = useState(view);
    const [loading, setLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedBatch, setSelectedBatch] = useState('CS-2024-A');
    const [isClassAdviser, setIsClassAdviser] = useState(true); // Mock: This faculty is a class adviser
    const [attendanceList, setAttendanceList] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSavingGrades, setIsSavingGrades] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState('');

    // Batches this faculty teaches
    const batches = [
        { id: 'CS-2024-A', name: 'CS 2024 - Section A', students: 45, isAdviser: true },
        { id: 'CS-2024-B', name: 'CS 2024 - Section B', students: 42, isAdviser: false },
        { id: 'CS-2023-A', name: 'CS 2023 - Section A', students: 48, isAdviser: false },
    ];

    // Courses by batch
    const coursesByBatch = {
        'CS-2024-A': [
            { id: 1, code: 'CS301', name: 'Data Structures', students: 45, nextClass: 'Mon 10:00 AM', room: 'LH-201' },
            { id: 2, code: 'CS350', name: 'Database Systems', students: 45, nextClass: 'Wed 02:00 PM', room: 'LH-203' },
        ],
        'CS-2024-B': [
            { id: 3, code: 'CS301', name: 'Data Structures', students: 42, nextClass: 'Tue 10:00 AM', room: 'LH-202' },
        ],
        'CS-2023-A': [
            { id: 4, code: 'CS450', name: 'Advanced Algorithms', students: 48, nextClass: 'Thu 11:00 AM', room: 'LH-301' },
        ],
    };

    // Students by batch for grades & attendance
    const studentsByBatch = {
        'CS-2024-A': [
            { id: 101, name: 'Alice Johnson', reg: 'YEN2401', midterm: 85, assignment: 90, final: '', total: '', status: 'present' },
            { id: 102, name: 'Bob Wilson', reg: 'YEN2402', midterm: 78, assignment: 85, final: '', total: '', status: 'present' },
            { id: 103, name: 'Charlie Davis', reg: 'YEN2403', midterm: 92, assignment: 88, final: '', total: '', status: 'absent' },
            { id: 104, name: 'Diana Prince', reg: 'YEN2404', midterm: 88, assignment: 95, final: '', total: '', status: 'present' },
            { id: 105, name: 'Edward Stone', reg: 'YEN2405', midterm: 75, assignment: 80, final: '', total: '', status: 'present' },
        ],
        'CS-2024-B': [
            { id: 201, name: 'Frank Miller', reg: 'YEN2411', midterm: 80, assignment: 85, final: '', total: '', status: 'present' },
            { id: 202, name: 'Grace Lee', reg: 'YEN2412', midterm: 90, assignment: 92, final: '', total: '', status: 'present' },
            { id: 203, name: 'Henry Brown', reg: 'YEN2413', midterm: 72, assignment: 78, final: '', total: '', status: 'absent' },
        ],
        'CS-2023-A': [
            { id: 301, name: 'Ivan Clark', reg: 'YEN2301', midterm: 88, assignment: 90, final: 85, total: 87, status: 'present' },
            { id: 302, name: 'Julia White', reg: 'YEN2302', midterm: 95, assignment: 98, final: 92, total: 94, status: 'present' },
        ],
    };

    // Announcements
    const [announcements, setAnnouncements] = useState([
        { id: 1, text: 'Mid-term exam scheduled for next Monday', date: '2026-01-03', batch: 'CS-2024-A' },
        { id: 2, text: 'Lab session rescheduled to Friday 3 PM', date: '2026-01-02', batch: 'CS-2024-A' },
    ]);

    // Class Adviser: Student mentoring notes
    const [mentoringNotes, setMentoringNotes] = useState([
        { studentId: 101, note: 'Strong performer, interested in research', date: '2025-12-15' },
        { studentId: 103, note: 'Needs additional support in algorithms', date: '2025-12-20' },
    ]);

    const [grades, setGrades] = useState(studentsByBatch[selectedBatch] || []);

    useEffect(() => {
        setActiveTab(view);
    }, [view]);

    useEffect(() => {
        // Update grades/attendance when batch changes
        setGrades(studentsByBatch[selectedBatch] || []);
        setAttendanceList(studentsByBatch[selectedBatch]?.map(s => ({ ...s })) || []);
    }, [selectedBatch]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token || role !== 'faculty') {
            router.push('/login');
        } else {
            setLoading(false);
            setAttendanceList(studentsByBatch[selectedBatch]?.map(s => ({ ...s })) || []);
        }
    }, [router]);

    if (loading) return <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }} />;

    const currentBatch = batches.find(b => b.id === selectedBatch);
    const courses = coursesByBatch[selectedBatch] || [];

    const toggleAttendance = (id) => {
        setAttendanceList(prev => prev.map(s =>
            s.id === id ? { ...s, status: s.status === 'present' ? 'absent' : 'present' } : s
        ));
    };

    const submitAttendance = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            const rollData = {
                course: selectedCourse?.code || courses[0]?.code,
                batch: selectedBatch,
                date: new Date().toISOString().split('T')[0],
                students: attendanceList
            };
            const rolls = JSON.parse(localStorage.getItem('erp_attendance_rolls') || '[]');
            localStorage.setItem('erp_attendance_rolls', JSON.stringify([rollData, ...rolls]));
            setIsSubmitting(false);
            alert('Attendance submitted successfully!');
            setActiveTab('courses');
        }, 1000);
    };

    const updateGrade = (id, field, value) => {
        setGrades(prev => prev.map(student => {
            if (student.id === id) {
                const updated = { ...student, [field]: value };
                const mid = parseFloat(updated.midterm) || 0;
                const assign = parseFloat(updated.assignment) || 0;
                const fin = parseFloat(updated.final) || 0;
                if (updated.midterm && updated.assignment && updated.final) {
                    updated.total = Math.round((mid * 0.3) + (assign * 0.2) + (fin * 0.5));
                }
                return updated;
            }
            return student;
        }));
    };

    const saveGrades = () => {
        setIsSavingGrades(true);
        setTimeout(() => {
            localStorage.setItem(`erp_grades_${selectedBatch}`, JSON.stringify(grades));
            setIsSavingGrades(false);
            alert('Grades saved successfully!');
        }, 800);
    };

    const postAnnouncement = () => {
        if (!newAnnouncement.trim()) return;
        const newAnn = {
            id: Date.now(),
            text: newAnnouncement,
            date: new Date().toISOString().split('T')[0],
            batch: selectedBatch
        };
        setAnnouncements([newAnn, ...announcements]);
        setNewAnnouncement('');
        alert('Announcement posted!');
    };

    return (
        <div className={styles.pageWrapper}>
            <Navbar />

            <main className={styles.main}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.pageTitle}>Faculty Dashboard</h1>
                        <p className={styles.pageSubtitle}>Dr. Sarah Smith • Academic Management</p>
                    </div>
                    {/* Batch Selector */}
                    <div className={styles.batchSelector}>
                        <label>Current Batch:</label>
                        <select
                            value={selectedBatch}
                            onChange={(e) => setSelectedBatch(e.target.value)}
                            className={styles.batchSelect}
                        >
                            {batches.map(batch => (
                                <option key={batch.id} value={batch.id}>
                                    {batch.name} {batch.isAdviser ? '★ Adviser' : ''}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Class Adviser Badge */}
                {currentBatch?.isAdviser && (
                    <div className={styles.adviserBadge}>
                        <Star size={16} />
                        <span>You are the Class Adviser for {currentBatch.name}</span>
                    </div>
                )}

                {/* Main Content */}
                <div className={styles.contentCard}>
                    {activeTab === 'courses' && (
                        <div>
                            <h2 className={styles.cardTitle}>Assigned Courses - {currentBatch?.name}</h2>
                            {courses.length > 0 ? (
                                <div className={styles.bentoGrid}>
                                    {courses.map(course => (
                                        <div key={course.id} className={styles.courseCard}>
                                            <div className={styles.courseHeader}>
                                                <span className={styles.courseCode}>{course.code}</span>
                                                <Users size={18} color="var(--text-tertiary)" />
                                            </div>
                                            <h3 className={styles.courseName}>{course.name}</h3>
                                            <div className={styles.courseStats}>
                                                <div className={styles.statLine}>
                                                    <span>Students</span>
                                                    <span className={styles.statBold}>{course.students}</span>
                                                </div>
                                                <div className={styles.statLine}>
                                                    <span>Next Class</span>
                                                    <span className={styles.statBold}>{course.nextClass}</span>
                                                </div>
                                                <div className={styles.statLine}>
                                                    <span>Room</span>
                                                    <span className={styles.statBold}>{course.room}</span>
                                                </div>
                                            </div>
                                            <button
                                                className={styles.btnOutline}
                                                onClick={() => {
                                                    setSelectedCourse(course);
                                                    setActiveTab('attendance');
                                                }}
                                            >
                                                Take Attendance <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.emptyState}>No courses assigned for this batch.</div>
                            )}

                            {/* Announcements Section */}
                            <div style={{ marginTop: 'var(--space-8)' }}>
                                <h3 className={styles.cardTitle}>
                                    <Bell size={18} style={{ marginRight: '8px' }} />
                                    Batch Announcements
                                </h3>
                                <div className={styles.announcementForm}>
                                    <input
                                        type="text"
                                        placeholder="Type an announcement for this batch..."
                                        value={newAnnouncement}
                                        onChange={(e) => setNewAnnouncement(e.target.value)}
                                        className={styles.announcementInput}
                                    />
                                    <button className={styles.btnPrimary} onClick={postAnnouncement}>
                                        Post
                                    </button>
                                </div>
                                <div className={styles.noticeList}>
                                    {announcements.filter(a => a.batch === selectedBatch).map(ann => (
                                        <div key={ann.id} className={styles.noticeItem}>
                                            <p style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{ann.text}</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>{ann.date}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'attendance' && (
                        <div>
                            <div className={styles.cardHeaderFlex}>
                                <h2 className={styles.cardTitle}>
                                    Attendance - {selectedCourse?.name || courses[0]?.name || 'Select Course'}
                                </h2>
                                <span className={styles.badge} style={{ background: 'rgba(46, 125, 50, 0.1)', color: 'var(--yen-green)' }}>
                                    {currentBatch?.name}
                                </span>
                            </div>
                            <div className={styles.attendanceControls}>
                                <div className={styles.inputGroupSmall}>
                                    <label>Course</label>
                                    <select
                                        value={selectedCourse?.id || courses[0]?.id}
                                        onChange={(e) => setSelectedCourse(courses.find(c => c.id === parseInt(e.target.value)))}
                                    >
                                        {courses.map(c => (
                                            <option key={c.id} value={c.id}>{c.code} - {c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles.inputGroupSmall}>
                                    <label>Date</label>
                                    <input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                                </div>
                            </div>

                            <div className={styles.tableWrapper}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Reg. ID</th>
                                            <th>Student Name</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {attendanceList.map(student => (
                                            <tr key={student.id}>
                                                <td className={styles.muted}>{student.reg}</td>
                                                <td className={styles.bold}>{student.name}</td>
                                                <td>
                                                    <button
                                                        onClick={() => toggleAttendance(student.id)}
                                                        className={`${styles.attendanceToggle} ${student.status === 'present' ? styles.present : styles.absent}`}
                                                    >
                                                        {student.status === 'present' ? 'Present' : 'Absent'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className={styles.formActions}>
                                <button
                                    className={styles.btnPrimary}
                                    onClick={submitAttendance}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Attendance'}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'grades' && (
                        <div>
                            <div className={styles.cardHeaderFlex}>
                                <h2 className={styles.cardTitle}>Grade Sheet - {currentBatch?.name}</h2>
                                <button
                                    className={styles.btnPrimary}
                                    onClick={saveGrades}
                                    disabled={isSavingGrades}
                                >
                                    {isSavingGrades ? 'Saving...' : 'Save Grades'}
                                </button>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 'var(--space-5)' }}>
                                Weights: Midterm (30%) + Assignment (20%) + Final (50%) = Total
                            </p>
                            <div className={styles.tableWrapper}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Reg. ID</th>
                                            <th>Student Name</th>
                                            <th>Midterm</th>
                                            <th>Assignment</th>
                                            <th>Final</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {grades.map(student => (
                                            <tr key={student.id}>
                                                <td className={styles.muted}>{student.reg}</td>
                                                <td className={styles.bold}>{student.name}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        value={student.midterm}
                                                        onChange={(e) => updateGrade(student.id, 'midterm', e.target.value)}
                                                        className={styles.gradeInput}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        value={student.assignment}
                                                        onChange={(e) => updateGrade(student.id, 'assignment', e.target.value)}
                                                        className={styles.gradeInput}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        value={student.final}
                                                        onChange={(e) => updateGrade(student.id, 'final', e.target.value)}
                                                        className={styles.gradeInput}
                                                        placeholder="—"
                                                    />
                                                </td>
                                                <td className={styles.bold}>
                                                    {student.total || '—'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Class Adviser Section */}
                    {activeTab === 'adviser' && currentBatch?.isAdviser && (
                        <div>
                            <h2 className={styles.cardTitle}>
                                <Star size={20} style={{ marginRight: '8px', color: 'var(--yen-gold)' }} />
                                Class Adviser - {currentBatch.name}
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
                                Manage student mentoring and performance tracking for your advisory class.
                            </p>

                            <div className={styles.statsGrid} style={{ marginBottom: 'var(--space-6)' }}>
                                <div className={styles.statCard}>
                                    <div className={styles.statIcon} style={{ background: 'rgba(46, 125, 50, 0.1)', color: 'var(--yen-green)' }}>
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <p className={styles.statLabel}>Total Students</p>
                                        <p className={styles.statValue}>{currentBatch.students}</p>
                                    </div>
                                </div>
                                <div className={styles.statCard}>
                                    <div className={styles.statIcon} style={{ background: 'rgba(21, 101, 192, 0.1)', color: 'var(--yen-blue)' }}>
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <p className={styles.statLabel}>Mentoring Notes</p>
                                        <p className={styles.statValue}>{mentoringNotes.length}</p>
                                    </div>
                                </div>
                            </div>

                            <h3 className={styles.cardTitle}>Student Directory</h3>
                            <div className={styles.tableWrapper}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Reg. ID</th>
                                            <th>Name</th>
                                            <th>Performance</th>
                                            <th>Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(studentsByBatch[selectedBatch] || []).map(student => {
                                            const note = mentoringNotes.find(n => n.studentId === student.id);
                                            const avg = student.total || Math.round((student.midterm + student.assignment) / 2);
                                            return (
                                                <tr key={student.id}>
                                                    <td className={styles.muted}>{student.reg}</td>
                                                    <td className={styles.bold}>{student.name}</td>
                                                    <td>
                                                        <span className={`${styles.badge}`} style={{
                                                            background: avg >= 80 ? 'rgba(46, 125, 50, 0.1)' : avg >= 60 ? 'rgba(201, 162, 39, 0.1)' : 'rgba(220, 38, 38, 0.1)',
                                                            color: avg >= 80 ? 'var(--yen-green)' : avg >= 60 ? 'var(--yen-gold)' : '#DC2626'
                                                        }}>
                                                            {avg >= 80 ? 'Excellent' : avg >= 60 ? 'Good' : 'Needs Attention'}
                                                        </span>
                                                    </td>
                                                    <td style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                                                        {note?.note || '—'}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

const FacultyDashboard = () => (
    <Suspense fallback={<div className={styles.pageWrapper}><div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }} /></div>}>
        <FacultyDashboardContent />
    </Suspense>
);

export default FacultyDashboard;
