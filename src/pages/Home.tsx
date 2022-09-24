import { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import qs from "qs";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

import { sortList } from "../components/Sort";

const Home: React.FC = () => {
  const isSearch = useRef(false),
    isMounted = useRef(false),
    dispatch = useDispatch(),
    navigate = useNavigate(),
    { items, status } = useSelector(selectPizzaData),
    { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter),
    pizzas = items.map((obj: any) => (
      <Link to={`/pizza/${obj.id}`}>
        <PizzaBlock {...obj} />
      </Link>
    )),
    skeletons = [...new Array(6)].map(() => <PizzaBlockSkeleton />),
    onChangeCategory = (index: number) => {
      dispatch(setCategoryId(index));
    },
    onChangePage = (page: number) => {
      dispatch(setCurrentPage(page));
    },
    getPizzas = async () => {
      const order = sort.sortProperty.includes("-") ? "asc" : "desc",
        sortBy = sort.sortProperty.replace("-", ""),
        category = categoryId > 0 ? `category=${categoryId}` : "",
        search = searchValue ? `&search=${searchValue}` : "";

      dispatch(
        // @ts-ignore
        fetchPizzas({
          order,
          sortBy,
          category,
          search,
          currentPage,
        })
      );

      window.scrollTo(0, 0);
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
      getPizzas();
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
      {status === "error" ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>Вероятно сайт упал. За вопросами обратитесь к администратору.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
