'use client';
import React, { useState, useEffect } from 'react';
import { QrCode, Users, Clock, StopCircle, RefreshCw, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Attendance.module.css';

const FacultyAttendancePanel = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(false);
    const [qrToken, setQrToken] = useState(null);
    const [presentCount, setPresentCount] = useState(0);
    const [error, setError] = useState(null);

    // Mock Classes
    const classes = [
        { id: 'CS101', name: 'Intro to CS - Sec A' },
        { id: 'CS102', name: 'Data Structures - Sec B' },
        { id: 'ENG201', name: 'Technical Writing' }
    ];
    const [selectedClass, setSelectedClass] = useState(classes[0].id);

    const startSession = async () => {
        setLoading(true);
        setError(null);
        try {
            // Mock taking location for "class location" logic
            let location = null;
            if (navigator.geolocation) {
                try {
                    const pos = await new Promise((resolve, reject) =>
                        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 })
                    );
                    location = { lat: pos.coords.latitude, lon: pos.coords.longitude };
                    console.log('Class Location Captured:', location);
                } catch (err) {
                    console.warn('Location capture failed, proceeding without geo-fence', err);
                }
            }

            const res = await fetch('/api/attendance/session/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    classId: selectedClass,
                    subject: classes.find(c => c.id === selectedClass).name,
                    location
                })
            });
            const data = await res.json();
            if (data.success) {
                setSession(data.data);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to start session');
        } finally {
            setLoading(false);
        }
    };

    // Poll for updates (QR rotation + count)
    useEffect(() => {
        if (!session || session.status !== 'ACTIVE') return;

        const poll = async () => {
            try {
                const res = await fetch(`/api/attendance/session/${session.id}`);
                const data = await res.json();
                if (data.success) {
                    if (data.status === 'EXPIRED') {
                        setSession(prev => ({ ...prev, status: 'EXPIRED' }));
                    } else {
                        setQrToken(data.data.token);
                        setPresentCount(data.data.presentCount);
                    }
                }
            } catch (err) {
                console.error("Polling error", err);
            }
        };

        poll(); // Immediate
        const interval = setInterval(poll, 2000); // Every 2s
        return () => clearInterval(interval);
    }, [session]);

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    <QrCode size={24} className="text-blue-600" style={{ color: 'var(--yen-blue)' }} />
                    Attendance Control
                </h2>
                {session && session.status === 'ACTIVE' && (
                    <span className={styles.liveBadge}>
                        Live Session
                    </span>
                )}
            </div>

            <AnimatePresence mode="wait">
                {!session || session.status !== 'ACTIVE' ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                    >
                        <div>
                            <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Select Class</label>
                            <select
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                className={styles.select}
                            >
                                {classes.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.infoBox}>
                            <MapPin size={18} className="mt-0.5 shrink-0" />
                            <p>
                                Location will be captured automatically to set the geo-fence center.
                                Ensure you are in the classroom.
                            </p>
                        </div>

                        {error && <div style={{ color: '#DC2626', fontSize: '0.875rem', marginTop: '1rem' }}>{error}</div>}

                        <button
                            onClick={startSession}
                            disabled={loading}
                            className={styles.btnPrimary}
                        >
                            {loading ? 'Starting...' : 'Start Attendance Session'}
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={styles.sessionActive}
                    >
                        <div className={styles.qrContainer}>
                            {qrToken ? (
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${JSON.stringify({
                                        sid: session.id,
                                        t: qrToken
                                    })}`}
                                    alt="Attendance QR"
                                    className={styles.qrImage}
                                    width={200}
                                    height={200}
                                />
                            ) : (
                                <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded-lg">
                                    <RefreshCw className="animate-spin text-gray-400" />
                                </div>
                            )}
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>
                                Token updates every 30s
                            </p>

                            {/* Debug Helper */}
                            <div style={{
                                padding: '8px',
                                background: 'rgba(201, 162, 39, 0.1)',
                                color: 'var(--yen-gold)',
                                fontSize: '0.75rem',
                                borderRadius: '8px',
                                wordBreak: 'break-all',
                                fontFamily: 'monospace',
                                border: '1px solid rgba(201, 162, 39, 0.2)'
                            }}>
                                <strong>DEBUG:</strong> {JSON.stringify({ sid: session.id, t: qrToken })}
                            </div>
                        </div>

                        <div className={styles.statGrid}>
                            <div className={styles.statBox}>
                                <p className={styles.statLabel}>Present</p>
                                <p className={styles.statValue}>
                                    {presentCount}
                                </p>
                            </div>
                            <div className={styles.statBox}>
                                <p className={styles.statLabel}>Time Left</p>
                                <p className={styles.statValue} style={{ color: 'var(--yen-gold)' }}>
                                    {Math.max(0, Math.ceil((new Date(session.expiresAt) - new Date()) / 60000))}m
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setSession(null)}
                            className={styles.btnDestructive}
                        >
                            <StopCircle size={18} />
                            End Session
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FacultyAttendancePanel;
