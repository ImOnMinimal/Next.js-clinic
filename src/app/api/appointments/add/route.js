// app/api/appointments/add/route.js
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request) {
    let connection;
    try {
        const { schedule_id, patient_name, phone_number } = await request.json();

        // 1. Валидация входных данных
        if (!schedule_id || !patient_name || !phone_number) {
            return NextResponse.json(
                { error: 'Все поля обязательны для заполнения' },
                { status: 400 }
            );
        }

        // 2. Проверка формата телефона (7XXXXXXXXXX)
        if (!/^7\d{10}$/.test(phone_number)) {
            return NextResponse.json(
                { error: 'Номер телефона должен быть в формате 7XXXXXXXXXX (11 цифр)' },
                { status: 400 }
            );
        }

        // 3. Проверка ФИО (кириллица, минимум 3 слова)
        if (!/^[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+$/u.test(patient_name)) {
            return NextResponse.json(
                { error: 'Введите полное ФИО кириллицей (Фамилия Имя Отчество)' },
                { status: 400 }
            );
        }

        connection = await pool.getConnection();
        await connection.beginTransaction();

        // 4. Проверка существующей записи на этот schedule_id
        const [existing] = await connection.execute(
            `SELECT id FROM appointments WHERE schedule_id = ?`,
            [schedule_id]
        );

        if (existing.length > 0) {
            await connection.rollback();
            return NextResponse.json(
                { error: 'На выбранное время уже существует запись' },
                { status: 409 }
            );
        }

        // 5. Создание записи (только в appointments)
        const [result] = await connection.execute(
            `INSERT INTO appointments 
             (schedule_id, patient_name, phone_number, status) 
             VALUES (?, ?, ?, 'booked')`,
            [schedule_id, patient_name, phone_number]
        );

        await connection.commit();

        return NextResponse.json({
            success: true,
            appointmentId: result.insertId
        });

    } catch (error) {
        if (connection) await connection.rollback();
        
        // Обработка дубликата (если UNIQUE constraint есть в БД)
        if (error.code === 'ER_DUP_ENTRY') {
            return NextResponse.json(
                { error: 'Это время уже занято' },
                { status: 409 }
            );
        }

        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Ошибка сервера: ' + error.message },
            { status: 500 }
        );
    } finally {
        if (connection) connection.release();
    }
}