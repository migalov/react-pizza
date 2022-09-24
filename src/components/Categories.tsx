import React from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  const categories = [
    "Все",
    "Мясные",
    "Веганские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i} // Только если массив статичный
            onClick={() => onChangeCategory(i)}
            className={value === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
