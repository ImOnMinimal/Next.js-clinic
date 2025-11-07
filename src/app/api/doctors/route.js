import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    try {
        const [doctors] = await pool.query(`
                SELECT d.*, u.last_name, u.first_name, u.middle_name
                FROM doctors d
                JOIN users u ON d.user_id = u.user_id
            `);
        // console.log(doctors)
        const doctorsWithPhotos = doctors.map(doctor => ({
            ...doctor,
            photo: doctor.photo
                ? {
                    type: doctor.photo.type || 'image/jpeg',
                    data: doctor.photo.toString('base64')
                }
                : null
        }));
        return NextResponse.json(doctorsWithPhotos);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}