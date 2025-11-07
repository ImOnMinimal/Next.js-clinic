// components/ItemForm.js
import { useState } from 'react';
import { format } from 'date-fns';

export default function FormModal({ isOpen, onClose, itemData }) {
    const [formData, setFormData] = useState({});
    console.log(itemData);
    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch('/api/appointments/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                schedule_id: itemData.schedule_id, // передаем готовый schedule_id
                patient_name: formData.patient_name,
                phone_number: formData.phone_number
            }),

        });
        onClose(); // Закрываем форму только после успеха

    };
    return (
        <div className={`fixed border inset-0 bg-opacity-50 flex items-center justify-center p-4 ${isOpen ? 'd-block' : 'd-none'}`}>
            <h2 className="text-xl font-bold mb-4">Форма на {itemData.start_time} - {itemData.end_time} {itemData.date ? format(itemData.date, 'dd-MM-yyyy') : null}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label>ФИО:</label><br/>
                    <label className="mb-2" style={{fontSize:13, color: 'gray'}}>Введите полное ФИО в формате: Фамилия Имя Отчество (кириллица, с заглавных букв)</label><br/>
                    <input
                        type="text"
                        value={formData.name}
                        pattern="^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+$"
                        onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    /><br/><br/>
                    <label>Номер телефона:</label><br/>
                    <label className="mb-2" style={{fontSize:13, color: 'gray'}}>Номер должен начинаться с 7 или 8 и содержать 11 цифр (например: 79123456789)</label><br/>
                    <input
                        type="tel"
                        value={formData.name}
                        pattern="[7-8][0-9]{10}"
                        inputMode="numeric"
                        onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border rounded"
                    >
                        Отмена
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 border rounded hover:bg-blue-600"
                    >
                        Отправить
                    </button>
                </div>
            </form>
        </div>
    );
}