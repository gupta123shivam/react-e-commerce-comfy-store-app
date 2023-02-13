import axios from "axios";
import React, { useCallback, useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url, single_product_url } from "../utils/constants";
import products from "../utils/mockProducts";
import single_product from "../utils/mockSingleProduct";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

// let products_data = products;
// let single_products_data = single_product;

// For production
let products_data = [];
let single_products_data = [];

const initialState = {
  isSidebarOpen: true,
  products_loading: false,
  products_error: { flag: false, msg: "" },
  products: products_data,
  featured_products: [],
  single_product_loading: false,
  single_product_error: { flag: false, msg: "" },
  single_products: single_products_data,
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function closeSidebar() {
    dispatch({
      type: SIDEBAR_CLOSE,
    });
  }
  function openSidebar() {
    dispatch({
      type: SIDEBAR_OPEN,
    });
  }

  // Set featured_products and products
  const fetchProducts = useCallback(async () => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      await axios(url).then((res) => {
        const products = res.data;
        dispatch({
          type: GET_PRODUCTS_SUCCESS,
          payload: { products },
        });
      });
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS_ERROR,
        single_product_error: {
          flag: true,
          msg: "Error while fetching products list",
        },
      });
    }
  }, []);
  // Local products setup while in production
  const fetchProductsLocal = () => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    const products = state.products;
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: { products },
    });
  };

  const fetchSingleProduct = useCallback(async (productId) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const url = `${single_product_url}${productId}`;
      console.log(url);
      await axios(url).then((res) => {
        const single_products = res.data;
        console.log(single_products);
        dispatch({
          type: GET_SINGLE_PRODUCT_SUCCESS,
          payload: { single_products },
        });
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_PRODUCT_ERROR,
        single_product_error: {
          flag: true,
          msg: `Error while fetching product with id ${productId}`,
        },
      });
    }
  }, []);
  const fetchSingleProductLocal = async () => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });

    // timeout to emulate server response delay
    setTimeout(() => {
      const single_products = state.single_products;
      dispatch({
        type: GET_SINGLE_PRODUCT_SUCCESS,
        payload: { single_products },
      });
    }, 2000);
  };

  useEffect(() => {
    fetchProducts(url); // For production
    // fetchProductsLocal(); // For local development
  }, [fetchProducts]);

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        closeSidebar,
        openSidebar,
        fetchSingleProduct,
        fetchSingleProductLocal,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
