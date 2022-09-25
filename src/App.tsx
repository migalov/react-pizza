import "./scss/app.scss";

import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { lazy, Suspense } from "react";
import Loadable from "react-loadable"

// const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"));

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ "./pages/Cart"),
  loading: () => <div>Загрузка...</div>
})

const FullPizza = lazy(() => import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza"));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
