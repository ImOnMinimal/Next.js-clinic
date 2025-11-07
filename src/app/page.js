// app/about/page.js
'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import './style.css'

export default function About() {
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        fetch('/api/doctors')
            .then(res => res.json())
            // set первых трёх докторов
            .then(data => setDoctors(data.slice(0, 3)));
    }, []);
    // console.log(doctors);
    return (
        <div>
            {/* Карусель */}
            <div className='blockProperties carousel-container rounded-5 mt-4 mb-2 position-relative'>
                <div className='w-100 h-100 rounded-5' style={{ width: 'auto', height: 'auto', position: 'absolute', right: 0, bottom: 0, backgroundImage: 'url(/images/carousel.jpg)' }}></div>
            </div>



            <h2 className='m-0 p-0 ms-4 mb-2 mt-4'><a href='/services' className='text-decoration-none text-black'>Услуги</a></h2>
            <div className="d-flex flex-nowrap">
                <div className="w-50 d-flex flex-wrap justify-content-center">
                    <div className='blockProperties ps-5 p-4 m-2 overflow-hidden rounded-5 flex-wrap' style={{ width: '100%', position: 'relative' }}>
                        <div className="row w-100">
                            <h5 className='m-0 p-0'>Приём специалистов</h5>
                        </div>
                        <div className="row w-100">Акушер</div>
                        <div className="row w-100">Гинеколог</div>
                        <div className="row w-100">Гастроэнтеролог</div>
                        <div className="row w-100">Уролог</div>
                        <div className="row w-100">Дерматовенеролог</div>
                        <div className="row w-100">Оториноларинголог</div>

                        <Image className='p-0' alt="stethoscope" src="/images/stethoscope.png" width={0} height={0} sizes="100vw" style={{ width: 'auto', height: 'auto', position: 'absolute', right: 0, bottom: 0 }}></Image>

                    </div>
                </div>
                <div className="w-50 d-flex flex-wrap justify-content-center">
                    <div className='blockProperties ps-5 p-4 m-2 overflow-hidden rounded-5 flex-wrap' style={{ width: '47%', position: 'relative' }}>
                        <div className="row w-100">
                            <h5 className='m-0 p-0'>Диагностика</h5>
                        </div>
                        <div className="row w-100">Анализы</div>
                        <div className="row w-100">Рентген</div>
                        <div className="row w-100">КТ</div>
                        <div className="row w-100">МРТ</div>
                        <div className="row w-100">УЗИ</div>
                        <Image className='p-0' alt="thermometer" src="/images/thermometer.png" width={0} height={0} sizes="100vw" style={{ width: 'auto', height: 'auto', position: 'absolute', right: 0, bottom: 0 }}></Image>

                    </div>
                    <div className='blockProperties p-4 ps-5 m-2 overflow-hidden rounded-5 flex-wrap' style={{ width: '47%', position: 'relative' }}>
                        <div className="row w-100">
                            <h5 className='m-0 p-0'>Хирургия</h5>
                        </div>
                        <div className="row w-100">Колопроктология</div>
                        <div className="row w-100">Флебология</div>
                        <div className="row w-100">Гинекология</div>
                        <div className="row w-100">Урология</div>
                        <div className="row w-100">Онкохирургия</div>
                        <Image className='p-0' alt="instruments" src="/images/instruments.png" width={0} height={0} sizes="100vw" style={{ width: 'auto', height: 'auto', position: 'absolute', right: 0, bottom: 0 }}></Image>
                    </div>

                    <div className='blockProperties p-4 ps-5 m-2 overflow-hidden rounded-5 flex-wrap' style={{ width: '47%', position: 'relative' }}>
                        <div className="row w-100"><h5 className='m-0 p-0'>Скорая помощь</h5></div>
                        <div className="row w-100"><h5 className='m-0 p-0'>Травмпункт</h5></div>
                        <Image className='p-0' alt="cross" src="/images/cross.png" width={0} height={0} sizes="100vw" style={{ width: 'auto', height: 'auto', position: 'absolute', right: 0, bottom: 0 }}></Image>
                    </div>
                    <div className='blockProperties p-4 ps-5 m-2 overflow-hidden rounded-5 flex-wrap' style={{ width: '47%', position: 'relative' }}>
                        <div className="row w-100"><h5 className='m-0 p-0'>Детский стационар</h5></div>
                        <div className="row w-100"><h5 className='m-0 p-0'>Роддом</h5></div>
                        <Image className='p-0' alt="pacifier" src="/images/pacifier.png" width={0} height={0} sizes="100vw" style={{ width: 'auto', height: 'auto', position: 'absolute', right: 0, bottom: 0 }}></Image>
                    </div>
                </div>
            </div>



            <h2 className='m-0 p-0 ms-4 mb-2 mt-4'><a href='/doctors' className='text-decoration-none text-black'>Специалисты</a></h2>
            <div className="d-flex flex-nowrap">
                <div className='doctorContainer'>
                    {doctors.map(doctor => (
                        <a href={`./doctors/${doctor.doctor_id}`} className='blockProperties m-2 overflow-hidden rounded-5 text-decoration-none' key={'doctor item ' + doctor.doctor_id} style={{ width: '30%', flexWrap: 'wrap', color: 'inherit' }}>
                            {/* <div className='d-flex w-100'> */}
                            <span className='w-100 doctor-name ps-4 pt-2 pe-3 text-nowrap'>{doctor.last_name} <br />{doctor.first_name} {doctor.middle_name}</span>
                            <span className='w-50 doctor-specialization ps-4 pt-2 pe-3'>{doctor.specialization}<br />стаж {doctor.experience} лет</span>
                            {/* </div> */}

                            <div className='d-flex w-100 justify-content-between'>
                                <div className='mt-auto mb-4 ms-4 doctor-view-button text-center'>Next</div>
                                <Image alt={`doctor_${doctor.last_name}_${doctor.first_name}_${doctor.middle_name}`} src={`data:${doctor.photo.type ? doctor.photo.type : 'empty'};base64,${doctor.photo.data ? doctor.photo.data : 'empty'}`} width={0} height={0} sizes="100vw" style={{ width: '300px', height: 'auto' }}></Image>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}