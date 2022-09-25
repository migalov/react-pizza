import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import qs from "qs";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";


import { sortList } from "../components/Sort";
import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selectors";
import { selectPizzaData } from "../redux/pizza/selectors";
import { setCategoryId, setCurrentPage } from "../redux/filter/slice";
import { fetchPizzas } from "../redux/pizza/asyncActions";

const Home: React.FC = () => {
  const isSearch = useRef(false),
    isMounted = useRef(false),
    dispatch = useAppDispatch(),
    navigate = useNavigate(),
    { items, status } = useSelector(selectPizzaData),
    { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter),
    pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />),
    skeletons = [...new Array(4)].map(() => <PizzaBlockSkeleton />),
    onChangeCategory = useCallback((index: number) => {
      dispatch(setCategoryId(index));
    }, []),
    onChangePage = (page: number) => {
      dispatch(setCurrentPage(page));
    },
    getPizzas = async () => {
      const order = sort.sortProperty.includes("-") ? "asc" : "desc",
        sortBy = sort.sortProperty.replace("-", ""),
        category = categoryId > 0 ? `category=${categoryId}` : "",
        search = searchValue ? `&search=${searchValue}` : "";

      dispatch(
        fetchPizzas({
          order,
          sortBy,
          category,
          search,
          currentPage: String(currentPage),
        })
      );

      window.scrollTo(0, 0);
    };

  //Если был 1-ый рендер, то проверяем url-параметры и сохраняем в Redux
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams,
  //       sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
  //       dispatch(setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortList[0]
  //       }))
  //   }
  // }, []);

  // Если изменили пар-ы и был 1-ый рендер
  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId: categoryId > 0 ? categoryId : null,
  //       currentPage,
  //     });

  //     navigate(`?${queryString}`);
  //   }

  //   if(!window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams))
  //   }

  // }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // Если был 1-ый рендер, то запрашиваем пиццы
  useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);

  //   if (!isSearch.current) {
  //     getPizzas();
  //   }

  //   isSearch.current = false;
  // }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
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
