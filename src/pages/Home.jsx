import { useState, useEffect } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlock/Skeleton";

export const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]),
    [isLoading, setIsLoading] = useState(true),
    [categoryId, setCategoryId] = useState(0),
    [sortType, setSortType] = useState({
      name: "популярности",
      sortProperty: "rating",
    }),
    pizzas = items
      .filter((obj) => {
        if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
          return true;
        }
        else return false;
      })
      .map((obj) => <PizzaBlock key={obj.id} {...obj} />),
    skeletons = [...new Array(6)].map((key) => <PizzaBlockSkeleton />);

  useEffect(() => {
    setIsLoading(true);
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc",
      sortBy = sortType.sortProperty.replace("-", ""),
      category = categoryId > 0 ? `category=${categoryId}` : "";
    fetch(
      `https://63278ddb9a053ff9aaa74737.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => setCategoryId(id)}
        />
        <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
    </>
  );
};

export default Home;
