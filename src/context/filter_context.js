import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filtered_products: [],
  all_products: [],
  is_grid_view: true,
  sort: "name-a",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    free_shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: LOAD_PRODUCTS,
      products,
    });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateSort = (sort) => {
    dispatch({ type: UPDATE_SORT, sort });
  };

  const updateFilters = (e) => {
    // Implemented as local state of Filters
    // checking if filters have changed
    // const isResortNeeded = Object.keys(state.filters)
    //   .map((filter) => state.filters[filter] !== filters[filter])
    //   .includes(true);
    // if (isResortNeeded) {
    //   dispatch({ type: UPDATE_FILTERS, filters });
    // }

    const name = e.target.name;
    let value = e.target.value;

    if (name === "color") {
      value = e.target.dataset.color;
    }

    if (name === "price") {
      value = parseInt(e.target.value);
    }

    if (name === "free_shipping") {
      value = e.target.checked;
    }

    dispatch({
      type: UPDATE_FILTERS,
      payload: { name, value },
    });
    // filterProducts();
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
