import { NextResponse } from 'next/server';
import { db } from '../../../../../lib/mockDb';
import { generateToken } from '../../../../../lib/utils';

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const session = db.sessions.findById(id);

        if (!session) {
            return NextResponse.json({ success: false, error: 'Session not found' }, { status: 404 });
        }

        if (session.status !== 'ACTIVE' || new Date() > new Date(session.expiresAt)) {
            // Auto-expire
            if (session.status === 'ACTIVE') {
                db.sessions.update(id, { status: 'EXPIRED' });
            }
            return NextResponse.json({ success: false, error: 'Session expired', status: 'EXPIRED' });
        }

        // Rotate Token mechanism (mocked here by just generating a new one on every poll, 
        // in prod we'd store the current token and rotation time)
        // For simplicity: generate a deterministic token based on time buckets (every 30s)
        const timeBucket = Math.floor(Date.now() / 30000);
        const dynamicToken = `${session.id}-${timeBucket}`;

        const count = db.records.countBySession(id);

        return NextResponse.json({
            success: true,
            data: {
                ...session,
                token: dynamicToken,
                presentCount: count
            }
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
