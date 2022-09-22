import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";
import { SearchContext } from "../App";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";

export const Home = () => {
  const dispatch = useDispatch(),
    { categoryId, sort, currentPage } = useSelector((state) => state.filter),
    onChangeCategory = (id) => {
      dispatch(setCategoryId(id));
    },
    onChangePage = number => {
      dispatch(setCurrentPage(number));
    };

  const [items, setItems] = useState([]),
    [isLoading, setIsLoading] = useState(true),
    { searchValue } = useContext(SearchContext),
    pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />),
    skeletons = [...new Array(6)].map(() => <PizzaBlockSkeleton />);

  useEffect(() => {
    setIsLoading(true);
    const order = sort.sortProperty.includes("-") ? "asc" : "desc",
      sortBy = sort.sortProperty.replace("-", ""),
      category = categoryId > 0 ? `category=${categoryId}` : "",
      search = searchValue ? `&search=${searchValue}` : "";

    axios.get(`https://63278ddb9a053ff9aaa74737.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then(response => {
        setItems(response.data);
        setIsLoading(false);
      });
      
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
