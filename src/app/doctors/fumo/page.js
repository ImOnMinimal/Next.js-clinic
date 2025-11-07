'use client';
import Image from 'next/image';


export default function Fumo() {
    return (
        <div className='container d-flex justify-content-center'>
            <Image src="/images/fumo.gif" alt="fumo" width={0} height={0} sizes="300vw" style={{ width: 'auto', height: 'auto' }}></Image>
        </div >
    );
}