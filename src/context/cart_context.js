import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";
const getCartItemsFromLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart && cart.length > 0) {
    return JSON.parse(cart);
  }
  return [];
};

const initialState = {
  cart: getCartItemsFromLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
  }, [state.cart]);

  // For saving cart tiems in localstorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  };

  const removeCartItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, id });
  };

  const toggleCartItemAmount = (id, amount) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, amount } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeCartItem,
        clearCart,
        toggleCartItemAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
