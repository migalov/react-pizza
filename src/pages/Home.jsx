import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import qs from "qs";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";
import { SearchContext } from "../App";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

import { sortList } from "../components/Sort";

export const Home = () => {
  const isSearch = useRef(false),
    isMounted = useRef(false),
    dispatch = useDispatch(),
    navigate = useNavigate(),
    [items, setItems] = useState([]),
    [isLoading, setIsLoading] = useState(true),
    { searchValue } = useContext(SearchContext),
    pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />),
    skeletons = [...new Array(6)].map(() => <PizzaBlockSkeleton />),
    { categoryId, sort, currentPage } = useSelector((state) => state.filter),
    onChangeCategory = (id) => {
      dispatch(setCategoryId(id));
    },
    onChangePage = (number) => {
      dispatch(setCurrentPage(number));
    },
    fetchPizzas = () => {
      setIsLoading(true);
      const order = sort.sortProperty.includes("-") ? "asc" : "desc",
        sortBy = sort.sortProperty.replace("-", ""),
        category = categoryId > 0 ? `category=${categoryId}` : "",
        search = searchValue ? `&search=${searchValue}` : "";

      axios
        .get(
          `https://63278ddb9a053ff9aaa74737.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        .then((response) => {
          setItems(response.data);
          setIsLoading(false);
        });
    };

  //Если был 1-ый рендер, то проверяем url-параметры и сохраняем в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)),
        sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  // Если изменили пар-ы и был 1-ый рендер
  useEffect(() => {
    if (isMounted.current) {
      const query = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${query}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // Если был 1-ый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
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
