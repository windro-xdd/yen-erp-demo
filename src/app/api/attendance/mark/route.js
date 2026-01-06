import { NextResponse } from 'next/server';
import { db } from '../../../../lib/mockDb';
import { getDistanceFromLatLonInMiters } from '../../../../lib/utils';

export async function POST(request) {
    try {
        const body = await request.json();
        const { sessionId, token, studentId, studentName, location, deviceId } = body;

        const session = db.sessions.findById(sessionId);
        if (!session) return NextResponse.json({ success: false, error: 'Invalid Session' }, { status: 404 });

        // 1. Check Expiry
        if (session.status !== 'ACTIVE' || new Date() > new Date(session.expiresAt)) {
            return NextResponse.json({ success: false, error: 'Session Expired' }, { status: 400 });
        }

        // 2. Validate Token
        const timeBucket = Math.floor(Date.now() / 30000);
        const validToken = `${session.id}-${timeBucket}`;
        const prevToken = `${session.id}-${timeBucket - 1}`; // Allow 30s grace

        if (token !== validToken && token !== prevToken) {
            return NextResponse.json({ success: false, error: 'Invalid or Expired QR Code' }, { status: 400 });
        }

        // 3. One Device Rule
        const deviceCheck = db.devices.registerOrVerify(studentId, deviceId);
        if (!deviceCheck.allowed) {
            return NextResponse.json({
                success: false,
                error: 'Unauthorized Device. You must use your registered device.'
            }, { status: 403 });
        }

        // 4. Location Check
        if (session.expectedLocation && location) {
            const dist = getDistanceFromLatLonInMiters(
                location.lat, location.lon,
                session.expectedLocation.lat, session.expectedLocation.lon
            );
            const ALLOWED_RADIUS = db.settings.get().defaultRadius;

            if (dist > ALLOWED_RADIUS) {
                return NextResponse.json({
                    success: false,
                    error: `You are too far from the class (${Math.round(dist)}m). Must be within ${ALLOWED_RADIUS}m.`
                }, { status: 403 });
            }
        }

        // 5. Duplicate Check
        const existing = db.records.findBySessionAndStudent(sessionId, studentId);
        if (existing) {
            return NextResponse.json({
                success: true,
                message: 'Attendance already marked',
                data: existing
            });
        }

        // 6. Success
        const record = db.records.create({
            sessionId,
            studentId,
            studentName,
            deviceId: deviceCheck.device.deviceId,
            location
        });

        return NextResponse.json({ success: true, data: record });

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
