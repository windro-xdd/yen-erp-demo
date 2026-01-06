'use client';
import React, { useState } from 'react';
import { Scan, MapPin, CheckCircle, AlertTriangle, Video, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Attendance.module.css';

const StudentAttendanceScanner = () => {
    const [status, setStatus] = useState('IDLE'); // IDLE, SCANNING, VERIFYING, SUCCESS, ERROR
    const [message, setMessage] = useState('');
    const [deviceInfo, setDeviceInfo] = useState('');

    // For Demo: Allow manual input since we don't have a real camera lib setup yet
    // In prod: would use html5-qrcode
    const [manualCode, setManualCode] = useState('');

    const handleMockScan = async (scannedData) => {
        setStatus('VERIFYING');
        try {
            // 1. Parse Data
            let parsed;
            try {
                parsed = JSON.parse(scannedData);
            } catch (e) {
                throw new Error("Invalid QR Code Format");
            }

            const { sid, t } = parsed;
            if (!sid || !t) throw new Error("Invalid QR Data");

            // 2. Get Location
            let location = null;
            if (navigator.geolocation) {
                try {
                    const pos = await new Promise((resolve, reject) =>
                        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 })
                    );
                    location = { lat: pos.coords.latitude, lon: pos.coords.longitude };
                } catch (err) {
                    console.warn('Location denied');
                    // throw new Error("Location access required"); // Strict mode?
                }
            }

            // 3. Submit
            const res = await fetch('/api/attendance/mark', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: sid,
                    token: t,
                    studentId: 'std_123', // Mock ID from auth context
                    studentName: 'John Doe',
                    deviceId: userAgentDeviceId(), // Simple browser fingerprint
                    location
                })
            });

            const data = await res.json();
            if (data.success) {
                setStatus('SUCCESS');
                setMessage(data.message || 'Attendance Marked Successfully!');
            } else {
                setStatus('ERROR');
                setMessage(data.error);
            }

        } catch (err) {
            setStatus('ERROR');
            setMessage(err.message);
        }
    };

    // Simple pseudo-fingerprint for demo "one device" rule
    const userAgentDeviceId = () => {
        if (typeof window === 'undefined') return 'server';
        return btoa(`${navigator.userAgent}-${navigator.platform}`).substring(0, 16);
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    <Scan size={24} style={{ color: 'var(--yen-blue)' }} />
                    Mark Attendance
                </h2>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-5)' }}>
                Scan the QR code displayed by your faculty to mark your attendance.
            </p>

            <div className="">
                {status === 'SUCCESS' ? (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={styles.successState}
                    >
                        <div style={{ width: 80, height: 80, background: 'rgba(46, 125, 50, 0.1)', color: 'var(--yen-green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                            <CheckCircle size={40} />
                        </div>
                        <h3 className={styles.title} style={{ justifyContent: 'center' }}>Success!</h3>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{message}</p>
                        <button
                            onClick={() => setStatus('IDLE')}
                            className={styles.btnSecondary}
                        >
                            Mark Another
                        </button>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        {status === 'ERROR' && (
                            <div style={{ padding: '1rem', background: 'rgba(220, 38, 38, 0.1)', color: '#DC2626', borderRadius: '8px', marginBottom: '1rem' }}>
                                <p className="flex items-center gap-2"><AlertTriangle size={18} /> {message}</p>
                            </div>
                        )}

                        <div className="grid gap-4">
                            <button
                                onClick={() => {
                                    const raw = prompt("Simulating Camera: Enter the JSON content of the QR code (e.g. {\"sid\":\"...\",\"t\":\"...\"})");
                                    if (raw) handleMockScan(raw);
                                }}
                                disabled={status === 'VERIFYING'}
                                className={styles.btnPrimary}
                            >
                                <Video />
                                {status === 'VERIFYING' ? 'Verifying...' : 'Open Camera & Scan'}
                            </button>

                            {/* Debug Input for easier testing */}
                            <div className={styles.debugToggle}>
                                <span>Or enter manually (Debug)</span>
                            </div>

                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    placeholder='Paste JSON: {"sid":"...", "t":"..."}'
                                    className={styles.input}
                                    value={manualCode}
                                    onChange={e => setManualCode(e.target.value)}
                                />
                                <button
                                    onClick={() => handleMockScan(manualCode)}
                                    className={styles.btnSecondary}
                                    style={{ width: 'auto', marginTop: 0 }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>

                        <div style={{ marginTop: '1.5rem', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                            <span className="flex items-center gap-1">
                                <Smartphone size={12} />
                                Device Check: Active
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin size={12} />
                                Geo-Fencing: Active
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentAttendanceScanner;
