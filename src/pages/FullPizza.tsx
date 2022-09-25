import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const FullPizza: React.FC = () => {
  const { id } = useParams(),
    navigate = useNavigate(),
    [pizza, setPizza] = useState<{
      imageUrl: string;
      title: string;
      price: number;
    }>();
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://63278ddb9a053ff9aaa74737.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        navigate("/");
        alert("Ошибка при получении пиццы");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
