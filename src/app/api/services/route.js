import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    try {
        const [services] = await pool.query(`
                SELECT s.*
                FROM services s
            `);
            // JOIN users u ON s.user_id = u.user_id
        return NextResponse.json(services);
    } catch (error) {
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}