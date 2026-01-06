// In-memory mock database for the University ERP Demo
// This resets on every server restart!

class MockStore {
    constructor() {
        this.sessions = []; // AttendanceSession[]
        this.records = [];  // AttendanceRecord[]
        this.devices = [];  // StudentDevice[]
        this.settings = {
            defaultRadius: 100, // meters
            defaultWindow: 5,   // minutes
        };
    }
}

// Global instance to persist across API calls in dev (might reset on HMR)
const globalStore = globalThis.mockStore || new MockStore();
if (process.env.NODE_ENV !== 'production') globalThis.mockStore = globalStore;

export const db = {
    sessions: {
        create: (data) => {
            const session = {
                id: `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                code: Math.random().toString(36).substr(2, 6).toUpperCase(),
                createdAt: new Date(),
                status: 'ACTIVE',
                ...data,
                expiresAt: new Date(Date.now() + (data.durationMinutes || 5) * 60000),
            };
            globalStore.sessions.push(session);
            return session;
        },
        findById: (id) => globalStore.sessions.find(s => s.id === id),
        update: (id, updates) => {
            const idx = globalStore.sessions.findIndex(s => s.id === id);
            if (idx === -1) return null;
            globalStore.sessions[idx] = { ...globalStore.sessions[idx], ...updates };
            return globalStore.sessions[idx];
        },
        findActiveByClass: (classId) => {
            return globalStore.sessions.find(s =>
                s.classId === classId &&
                s.status === 'ACTIVE' &&
                new Date() < s.expiresAt
            );
        }
    },

    records: {
        create: (data) => {
            const record = {
                id: `rec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                timestamp: new Date(),
                ...data
            };
            globalStore.records.push(record);
            return record;
        },
        findBySessionAndStudent: (sessionId, studentId) => {
            return globalStore.records.find(r =>
                r.sessionId === sessionId && r.studentId === studentId
            );
        },
        countBySession: (sessionId) => {
            return globalStore.records.filter(r => r.sessionId === sessionId).length;
        }
    },

    devices: {
        registerOrVerify: (studentId, deviceId) => {
            // Simple 1-device rule for demo: 
            // If student has no device, register this one.
            // If student has device, it MUST match.
            const existing = globalStore.devices.find(d => d.studentId === studentId);
            if (!existing) {
                const newDevice = { studentId, deviceId, registeredAt: new Date() };
                globalStore.devices.push(newDevice);
                return { allowed: true, device: newDevice };
            }
            return { allowed: existing.deviceId === deviceId, device: existing };
        }
    },

    settings: {
        get: () => globalStore.settings
    }
};
