import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      const maxPrice = Math.max(...action.products.map((p) => p.price));
      const minPrice = Math.min(...action.products.map((p) => p.price));

      return {
        ...state,
        all_products: [...action.products],
        filtered_products: [...action.products],
        filters: {
          ...state.filters,
          max_price: maxPrice,
          price: maxPrice,
          min_price: minPrice,
        },
      };
    }

    case SET_LISTVIEW: {
      return {
        ...state,
        is_grid_view: false,
      };
    }

    case SET_GRIDVIEW: {
      return {
        ...state,
        is_grid_view: true,
      };
    }

    case UPDATE_SORT: {
      return {
        ...state,
        sort: action.sort,
      };
    }

    case SORT_PRODUCTS: {
      const sortedProducts = sortProducts(state.sort, state.filtered_products);
      return {
        ...state,
        filtered_products: sortedProducts,
      };
    }

    case UPDATE_FILTERS: {
      const { name, value } = action.payload;
      return {
        ...state,
        filters: { ...state.filters, [name]: value },
      };
    }

    case FILTER_PRODUCTS: {
      const filteredProducts = filterProducts(
        state.filters,
        state.all_products
      );
      return {
        ...state,
        filtered_products: filteredProducts,
      };
    }

    case CLEAR_FILTERS: {
      const filters = {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        free_shipping: false,
      };
      return {
        ...state,
        filtered_products: state.all_products,
        filters,
      };
    }

    default: {
      throw new Error(`No Matching "${action.type}" - action type`);
    }
  }
};

function sortProducts(sort, products) {
  const newProducts = [...products];
  let sortedProducts = null;
  switch (sort) {
    case "price-lowest": {
      sortedProducts = newProducts.sort((a, b) => a.price - b.price);
      break;
    }
    case "price-highest": {
      sortedProducts = newProducts.sort((a, b) => b.price - a.price);
      break;
    }
    case "name-a": {
      sortedProducts = newProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    }
    case "name-z": {
      sortedProducts = newProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    }

    default: {
    }
  }
  return sortedProducts;
}
const filterProducts = (filters, products) => {
  const {
    text,
    company,
    category,
    color,
    min_price,
    price,
    free_shipping,
  } = filters;
  const newProducts = [...products];
  let filteredProducts = newProducts;
  // Text filter
  if (text !== "") {
    filteredProducts = newProducts.filter((product) =>
      product.name.includes(text)
    );
  }

  // Category filter
  if (category !== "all") {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  // Company filter
  if (company !== "all") {
    filteredProducts = filteredProducts.filter((p) => p.company === company);
  }

  // Color filter
  if (color !== "all") {
    filteredProducts = filteredProducts.filter((p) => p.colors.includes(color));
  }

  // Price filter
  filteredProducts = filteredProducts.filter(
    (p) => p.price >= min_price && p.price <= price
  );

  // Shipping filter
  if (free_shipping) {
    filteredProducts = filteredProducts.filter((p) => p.shipping);
  }

  return filteredProducts;
};

export default filter_reducer;
