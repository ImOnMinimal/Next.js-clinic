import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request, { params }) {
    const {id} = await params
    try {

        const [schedule] = await pool.query(`
                SELECT 
                    s.date,
                    s.schedule_id,
                    s.start_time,
                    s.end_time,
                    s.slot_type,
                    a.status
                FROM Schedules s
                LEFT JOIN Appointments a ON a.schedule_id = s.schedule_id
                WHERE s.doctor_id = ?
                AND s.date BETWEEN 
                    DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01') 
                    AND LAST_DAY(DATE_ADD(CURDATE(), INTERVAL 1 MONTH))
                ORDER BY s.date, s.start_time
            `, [id])

        return NextResponse.json(schedule);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}