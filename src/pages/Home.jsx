import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";

export const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]),
    [isLoading, setIsLoading] = useState(true),
    [categoryId, setCategoryId] = useState(0),
    [currentPage, setCurrentPage] = useState(1),
    [sortType, setSortType] = useState({
      name: "популярности",
      sortProperty: "rating",
    }),
    pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />),
    skeletons = [...new Array(6)].map((key) => <PizzaBlockSkeleton />);

  useEffect(() => {
    setIsLoading(true);
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc",
      sortBy = sortType.sortProperty.replace("-", ""),
      category = categoryId > 0 ? `category=${categoryId}` : "",
      search = searchValue ? `&search=${searchValue}` : ""
    fetch(
      `https://63278ddb9a053ff9aaa74737.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

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
      <Pagination onChangePage={ number => setCurrentPage(number)} />
    </>
  );
};

export default Home;
