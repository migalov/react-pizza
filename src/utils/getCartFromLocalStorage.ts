import { CartItem } from "../redux/cart/types";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLocalStorage = () => {
  const data = localStorage.getItem("cart"),
    items = data ? JSON.parse(data) : [],
    totalPrice = calcTotalPrice(items);
  return {
    items: items as CartItem[],
    totalPrice,
  };
};
