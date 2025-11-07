// components/doctors/DoctorCalendar.js
"use client";

import { useState } from 'react';
import {
    startOfMonth, format, addMonths, subMonths, endOfMonth, eachDayOfInterval, parseISO, startOfWeek, endOfWeek, differenceInCalendarDays
} from 'date-fns';
import { ru } from 'date-fns/locale';
import FormModal from './FormModal';

export const DoctorCalendar = ({ doctorId, initialSchedule }) => {
    const [activeSchedule, setActiveSchedule] = useState(initialSchedule.filter(slot => format(parseISO(slot.date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')));
    const [selectedItem, setSelectedItem] = useState(null);

    const openForm = (item) => {
        setSelectedItem(item);
    };

    const closeForm = () => {
        setSelectedItem(null);
        alert('Запись успешно создана');
    };

    const getSlotsForDate = (date) => {
        return initialSchedule.filter(slot => format(parseISO(slot.date), 'yyyy-MM-dd') === date);
    };
    // Генерация данных для 3 месяцев
    const currentDate = new Date();
    const monthsData = [
        {
            title: format(subMonths(currentDate, 1), 'MMMM yyyy'),
            dates: eachDayOfInterval({
                start: startOfMonth(subMonths(currentDate, 1)),
                end: endOfMonth(subMonths(currentDate, 1))
            }).map(date => format(date, 'yyyy-MM-dd')),
            // считает разницу между первым днем недели начала месяца и началом месяца
            differenceInFirstDays: Math.abs(Number(differenceInCalendarDays(startOfMonth(subMonths(currentDate, 1)), startOfWeek(startOfMonth(subMonths(currentDate, 1)))))) - 1,
            // аналогично, но для последних дней
            differenceInLastDays: Math.abs(Number(differenceInCalendarDays(endOfMonth(subMonths(currentDate, 1)), endOfWeek(endOfMonth(subMonths(currentDate, 1)))))) + 1
        },
        {
            title: format(currentDate, 'MMMM yyyy'),
            dates: eachDayOfInterval({
                start: startOfMonth(currentDate),
                end: endOfMonth(currentDate)
            }).map(date => format(date, 'yyyy-MM-dd')),
            differenceInFirstDays: Math.abs(Number(differenceInCalendarDays(startOfMonth(currentDate), startOfWeek(startOfMonth(currentDate))))) - 1,
            differenceInLastDays: Math.abs(Number(differenceInCalendarDays(endOfMonth(currentDate), endOfWeek(endOfMonth(currentDate))))) + 1



        },
        {
            title: format(addMonths(currentDate, 1), 'MMMM yyyy'),
            dates: eachDayOfInterval({
                start: startOfMonth(addMonths(currentDate, 1)),
                end: endOfMonth(addMonths(currentDate, 1))
            }).map(date => format(date, 'yyyy-MM-dd')),
            differenceInFirstDays: Math.abs(Number(differenceInCalendarDays(startOfMonth(addMonths(currentDate, 1)), startOfWeek(startOfMonth(addMonths(currentDate, 1)))))) - 1,
            differenceInLastDays: Math.abs(Number(differenceInCalendarDays(endOfMonth(addMonths(currentDate, 1)), endOfWeek(endOfMonth(addMonths(currentDate, 1)))))) + 1

        },
    ];

    return (
        <div className='w-100'>
            <div className="mt-4 w-100 d-flex justify-content-between">
                {monthsData.map((month, i) => (
                    <div key={i} className='border rounded m-2' style={{ backgroundColor: '#ffffff' }}>
                        {/* Название месяца */}
                        <h2 className='ms-3 mt-2'>{format(month.title, 'LLLL', { locale: ru }).replace(/^./, char => char.toUpperCase())}</h2>
                        {/* Названия дней недели */}
                        <div className='d-flex'>
                            <div style={{ fontSize: '0.8rem', width: '14.28%' }}>
                                <div className="border rounded m-1">
                                    <div className="date text-center">Пн<br /></div>
                                </div>
                            </div>
                            <div style={{ fontSize: '0.8rem', width: '14.28%' }}>
                                <div className="border rounded m-1">
                                    <div className="date text-center">Вт<br /></div>
                                </div>
                            </div>
                            <div style={{ fontSize: '0.8rem', width: '14.28%' }}>
                                <div className="border rounded m-1">
                                    <div className="date text-center">Ср<br /></div>
                                </div>
                            </div>
                            <div style={{ fontSize: '0.8rem', width: '14.28%' }}>
                                <div className="border rounded m-1">
                                    <div className="date text-center">Чт<br /></div>
                                </div>
                            </div>
                            <div style={{ fontSize: '0.8rem', width: '14.28%' }}>
                                <div className="border rounded m-1">
                                    <div className="date text-center">Пт<br /></div>
                                </div>
                            </div>
                            <div style={{ fontSize: '0.8rem', width: '14.28%' }}>
                                <div className="border rounded m-1">
                                    <div className="date text-center">Сб<br /></div>
                                </div>
                            </div>
                            <div style={{ fontSize: '0.8rem', width: '14.28%' }}>
                                <div className="border rounded m-1">
                                    <div className="date text-center">Вс<br /></div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-wrap w-100">
                            {/* Заполнение первых дней недели которые не входят в месяц (допустим, месяц начинается со вторника, нужно всё равно отобразить понедельник, но затемнённым) с помощью цикла, чтобы создать пустые ячейки, используя информацию о названии дня недели первого дня месяца */}
                            {month.differenceInFirstDays >= 0 && month.differenceInFirstDays < 7 ? [...Array(month.differenceInFirstDays).keys()].map(i =>
                                <div key={i} style={{ fontSize: '0.8rem', width: '14.28%' }}>
                                    <div className="border rounded m-1">
                                        <div className="date"><br /></div>
                                        <div className="slots">
                                            <div style={{ backgroundColor: '#bebebeff' }}><br /><br /></div>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                            }

                            {/* Данные для каждого дня недели */}
                            {month.dates.map(date => {
                                const slots = getSlotsForDate(date);
                                return (
                                    <div key={date} style={{ fontSize: '0.8rem', width: '14.28%' }}>
                                        <div className="border rounded m-1">
                                            <div className="date">{format(new Date(date), 'd')}</div>
                                            <div className="slots">
                                                {slots.length > 0 ? (
                                                    // перебор всех slots с проверкой на наличие слота свободных слотов, если их нет или отдых то выводится другое
                                                    // Если в slots есть хоть один рабочий и не занятый слот, то выводится кнопка с текстом Есть места
                                                    slots.some(slot => slot.slot_type === 'working' && (slot.status !== 'booked' && slot.status !== 'completed')) ?
                                                        <button className='w-100' style={{ backgroundColor: '#e7daffff', border: 'none' }} onClick={() => setActiveSchedule(slots)}>
                                                            Есть места
                                                        </button>
                                                        :
                                                        <button className='w-100' style={{ backgroundColor: '#ffdaedff', border: 'none' }} onClick={() => setActiveSchedule(slots)}>
                                                            Нет мест
                                                        </button>
                                                ) : (
                                                    <div className='text-center' style={{ backgroundColor: '#f0f2ffff' }}>Данных нет</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Аналогично тому, что было ранее, но для последних дней недели */}
                            {month.differenceInLastDays > 0 && month.differenceInLastDays < 7 ? [...Array(month.differenceInLastDays).keys()].map(i =>
                                <div key={i} style={{ fontSize: '0.8rem', width: '14.28%' }}>
                                    <div className="border rounded m-1">
                                        <div className="date"><br /></div>
                                        <div className="slots">
                                            <div style={{ backgroundColor: '#bebebeff' }}><br /><br /></div>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                            }
                        </div>
                    </div>
                ))}
            </div>

            {/* Расписание на выбранный день недели */}
            <div className='w-100 d-flex flex-wrap'>
                <h3 className='w-100 m-3 mb-2'>{activeSchedule.length > 0 ? format(activeSchedule[0].date, 'dd-MM-yyyy') : null}</h3>
                {activeSchedule.sort((a, b) => a.start_time - b.start_time).map(schedule => (
                    <div className='w-auto border rounded m-2 p-2 text-center' key={schedule.schedule_id} onClick={schedule.status !== 'booked' ? (() => openForm(schedule)) : null}>
                        <div>{schedule.start_time.slice(0, -3)} - {schedule.end_time.slice(0, -3)}</div>
                        {schedule.slot_type === 'working' ? <div style={{ backgroundColor: '#a3d1ffff' }}>Открыто</div> : <div style={{ backgroundColor: '#e7bfffff' }}>Перерыв</div>}
                        {schedule.status === 'booked' ? <div style={{ backgroundColor: '#ffacacff' }}>Занято</div> : <div style={{ backgroundColor: '#bfffb9ff' }}>Свободен</div>}
                    </div>
                ))}
            </div>

            {/* Форма записи */}
            <FormModal
                isOpen={selectedItem !== null}
                onClose={closeForm}
                itemData={selectedItem || {}}
            />
        </div >

    );
};