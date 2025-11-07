// app/about/page.jsx
'use client';
import { useState } from 'react';
import { Container, Accordion, Card } from 'react-bootstrap';
import './style.css'

export default function About() {
    const [activeKey, setActiveKey] = useState(null);

    const accordionItems = [
        {
            title: 'Наша миссия',
            content: 'Мы стремимся предоставлять высококачественную медицинскую помощь с использованием современных технологий и индивидуального подхода к каждому пациенту.',
            eventKey: '0'
        },
        {
            title: 'История клиники',
            content: 'Основанная в 2010 году, наша клиника выросла из небольшого кабинета в многопрофильный медицинский центр с командой из 50 специалистов.',
            eventKey: '1'
        },
        {
            title: 'Наши врачи',
            content: 'В нашей клинике работают только высококвалифицированные специалисты с большим опытом работы, регулярно повышающие свою квалификацию.',
            eventKey: '2'
        },
        {
            title: 'Оборудование',
            content: 'Мы используем современное диагностическое и терапевтическое оборудование от ведущих мировых производителей медицинской техники.',
            eventKey: '3'
        },
        {
            title: 'Лицензии и сертификаты',
            content: 'Клиника имеет все необходимые лицензии и сертификаты соответствия международным стандартам качества медицинской помощи.',
            eventKey: '4'
        }
    ];

    return (
        <Container className="my-5">
            <Accordion className="d-flex flex-wrap mb-5 blockProperties m-2 p-2 pb-3 overflow-hidden rounded-3" bsPrefix={'aboutAccordion-1'} activeKey={activeKey} onSelect={(e) => setActiveKey(e)}>
                {accordionItems.map((item) => (
                    <Accordion.Item className='border-0 m-3 w-100' key={item.eventKey} bsPrefix={'aboutAccordion-1-item'} eventKey={item.eventKey}>
                        <Accordion.Header className='p-2 m-0 ps-3 ' bsPrefix={'aboutAccordion-1-header'}>
                            <div style={{fontSize: 20}}>{item.title}</div>
                            {/* <div className='w-100 d-flex' style={{ height: 1, backgroundColor: 'purple' }}></div> */}
                        </Accordion.Header>
                        <Accordion.Body className='p-2 m-0' bsPrefix={'aboutAccordion-1-body'}>
                            {item.content}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>

            <Card className="blockProperties m-2 overflow-hidden rounded-3">
                <Card.Body>
                    <h2 className="ms-2 mb-4">Наши преимущества</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    Индивидуальный подход к каждому пациенту
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    Современное диагностическое оборудование
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    Комфортные условия пребывания
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    Доступные цены и гибкая система скидок
                                </li>
                            </ul>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}