import { useState } from "react";

function Categories() {
  const [activeIndexCategory, setActiveIndexCategory] = useState(0);
  const categories = ["Все", "Мясные", "Веганские"];
  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li
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
