"use client";
import { useState, useEffect } from "react";
import "./style.css";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  
  // Фетч услуг
  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  // Список всех категорий 
  const categoryList = [
    ...new Set(services.map((service) => service.category)),
  ];
  const [activeCategory, setActiveCategory] = useState('Терапия');
  const [searchQuery, setSearchQuery] = useState("");

  // Фильтр услуг по активной категории либо по поисковой строке
  const filtered = services.filter((s) => {
    const matches = {
      activeCategory: searchQuery || s.category === activeCategory,
      searchQuery: s.title
        .toLowerCase()
        .includes(searchQuery.toLocaleLowerCase()),
    };
    return Object.values(matches).every(Boolean); // метод возвращает true если все элементы приводятся к true
  });

  return (
    <div>
      <div className="services-filter-block mt-4 mb-3">
        {/* Поисковая строка */}
        <input
          type="text"
          placeholder="Поиск..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="w-100 d-flex justify-content-between">
        <div
          className="services_category-list d-flex flex-wrap justify-content-center align-self-start"
          style={{ width: "20%" }}
        >
          {/* Список категорий */}
          {categoryList.map((category) => (
            <button
              key={"categoryList item " + category}
              onClick={() => setActiveCategory(category)}
              className="text-start blockProperties ps-1 pe-1 m-1 overflow-hidden rounded-5 row"
              style={{ width: "100%", height: "60px", alignItems: "center" }}
            >
              <div className="column w-auto">{category}</div>
            </button>
          ))}
        </div>

        <div
          className="services_category-list d-flex flex-wrap justify-content-center align-self-start"
          style={{ width: "80%" }}
        >
          {/* Список фильтрованных услуг */}
          {filtered.map((service) => (
            <div
              key={"service item " + service.service_id}
              className="blockProperties p-3 m-2 overflow-hidden rounded-5 justify-content-between flex-nowrap row"
              style={{ width: "100%" }}
            >
              <div
                className="ps-2 pe-2 text-start align-items-center d-flex"
                style={{ width: "89%" }}
              >
                {service.title}
              </div>

              <div
                className="ps-2 pe-2 text-start align-items-center d-flex"
                style={{ width: "9%" }}
              >
                {service.price}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
