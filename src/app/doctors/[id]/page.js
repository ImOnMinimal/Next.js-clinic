import Image from 'next/image';
import '../style.css'
import { DoctorCalendar } from '@/components/doctors/DoctorCalendar';


async function getDoctor(id) {
    return await fetch(`http://localhost:3000/api/doctors/${id}`)
        .then(res => res.json())
        .then(data => data[0]);
}

export default async function DoctorPage({ params }) {
    const { id } = await params
    const doctor = await getDoctor(id);
    const initialSchedule = await fetch(`http://localhost:3000/api/doctors/${id}/calendar`)
        .then(res => res.json())
    // console.log(schedule)

    return (

        <div className='doctorContainer d-flex'>
            <div className="d-flex flex-wrap justify-content-between w-100">
                <button className='blockProperties m-2 overflow-hidden rounded-5' key={'doctor item ' + doctor.doctor_id} style={{ width: 'auto', flexWrap: 'wrap' }}>

                    <div className='d-flex w-100 justify-content-between'>
                        {/* <div className='mt-auto mb-4 ms-4 doctor-view-button'>Next</div> */}
                        <Image alt={`doctor_${doctor.last_name}_${doctor.first_name}_${doctor.middle_name}`} src={`data:${doctor.photo.type ? doctor.photo.type : 'empty'};base64,${doctor.photo.data ? doctor.photo.data : 'empty'}`} width={0} height={0} sizes="100vw" style={{ width: '300px', height: 'auto' }}></Image>
                    </div>
                </button>

                <div className='blockProperties overflow-hidden rounded-5 doctor-name p-4 m-2 pe-3 text-wrap flex-wrap align-self-start flex-grow-1'>
                    <span className='w-100 d-flex'>{doctor.last_name} {doctor.first_name} {doctor.middle_name}</span><br />

                    <div className='w-100 d-flex mt-3'><span className='experience-style'>стаж {doctor.experience} лет </span><br /></div>
                    <span className='w-100 d-flex mt-3'>{doctor.specialization}</span><br />

                </div>
                {/* </div> */}
            </div>
            <DoctorCalendar doctorId={id} initialSchedule={initialSchedule} />
        </div>

    );
}