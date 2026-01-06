import { NextResponse } from 'next/server';
import { db } from '../../../../../lib/mockDb';

export async function POST(request) {
    try {
        const body = await request.json();
        const { classId, subject, durationMinutes = 5, location } = body;

        // In a real app, verify faculty session/token here

        // Check if active session exists
        const active = db.sessions.findActiveByClass(classId);
        if (active) {
            return NextResponse.json({
                success: true,
                data: active,
                message: "Resuming existing active session"
            });
        }

        const session = db.sessions.create({
            classId,
            subject,
            durationMinutes,
            expectedLocation: location, // { lat, lon }
        });

        return NextResponse.json({ success: true, data: session });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
