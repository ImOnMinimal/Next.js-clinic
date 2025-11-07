'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import './style.css'


export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);

  const [specialization, setSpecialization] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // fetch докторов из API
  useEffect(() => {
    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data));
  }, []);
    console.log(doctors);

  // Фильтрация
  const filtered = doctors
    .filter(d => {
      const matches = {
        // true, если специализация не указана или выбранная специализация совпадает с таковой в json
        specialization: !specialization || d.specialization === specialization,
        // .some(...) возвращает true, если хотя бы один элемент массива удовлетворяет условию
        // f.toLowerCase() приводит строку к нижнему регистру и сравнивает с введённым в поисковую строку текстом
        search: !searchQuery || [d.last_name, d.first_name, d.middle_name, d.specialization].some(f => f.toLowerCase().includes(searchQuery.toLocaleLowerCase()))
      }
      console.log(d.last_name, d.first_name, d.middle_name, d.specialization)
      return Object.values(matches).every(Boolean); // метод возвращает true если все элементы приводятся к true      
    }
    )



  return (
    <div className='container'>
      <div className='doctors-filter-block mt-4 mb-3'>
        {/* Поисковая строка */}
        <input className='search-input'
          type="text"
          placeholder="Поиск..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Фильтр специализации */}
        <div className='search-filter'>
          <select onChange={(e) => setSpecialization(e.target.value)}>
            <option value="">Все специализации</option>
            {[...new Set(doctors.map(doctor => doctor.specialization))].map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
      </div>

      <div className='doctorContainer'>
        {filtered.map(doctor => (
          <a href={`./doctors/${doctor.doctor_id}`} className='blockProperties m-2 overflow-hidden rounded-5 text-decoration-none' key={'doctor item ' + doctor.doctor_id} style={{ width: '30%', flexWrap: 'wrap', color: 'inherit' }}>
            {/* <div className='d-flex w-100'> */}
            <span className='w-100 doctor-name ps-4 pt-2 pe-3 text-nowrap'>{doctor.last_name} <br />{doctor.first_name} {doctor.middle_name}</span>
            <span className='w-50 doctor-specialization ps-4 pt-2 pe-3'>{doctor.specialization}<br />стаж {doctor.experience} лет</span>
            {/* </div> */}

            <div className='d-flex w-100 justify-content-between'>
              <div className='mt-auto mb-4 ms-4 doctor-view-button text-center text-white'>Next</div>
              <Image alt={`doctor_${doctor.last_name}_${doctor.first_name}_${doctor.middle_name}`} src={`data:${doctor.photo.type ? doctor.photo.type : 'empty'};base64,${doctor.photo.data ? doctor.photo.data : 'empty'}`} width={0} height={0} sizes="100vw" style={{ width: '250px', height: 'auto', borderRadius: '10px 0px 0px 0px', position: 'relative' }}></Image>
            </div>
          </a>
        ))}
      </div>
    </div >
  );
}