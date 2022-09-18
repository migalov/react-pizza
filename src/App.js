import logo from "./logo.svg";
import "./scss/app.scss";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import pizzas from "./pizzas.json";
import { useEffect, useState } from "react";

function App() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://63278ddb9a053ff9aaa74737.mockapi.io/items')
      .then(res => res.json())
      .then(arr => setItems(arr));
  }, [])


  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              items.map((obj) => 
                <PizzaBlock key={obj.id} {...obj} />
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
