import { useState } from "react";

function Categories() {
  const [activeIndexCategory, setActiveIndexCategory] = useState(0);
  const categories = ["Все", "Мясные", "Веганские", "Гриль", "Острые", "Закрытые"];
  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li
            key={i} // Только если массив статичный
            onClick={() => setActiveIndexCategory(i)}
            className={activeIndexCategory === i ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
