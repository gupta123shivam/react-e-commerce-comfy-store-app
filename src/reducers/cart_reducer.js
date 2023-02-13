import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { id, color, amount, product } = action.payload;
      const tempItem = state.cart.find((i) => i.id === id + color);
      if (tempItem) {
        const newItem = { ...tempItem, amount };
        const otheritems = state.cart.filter((i) => i.id !== id + color);
        return { ...state, cart: [...otheritems, newItem] };
      } else {
        const newItem = {
          productId: id,
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max_stock: product.stock,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }
    }

    case CLEAR_CART: {
      return {
        cart: [],
        total_items: 0,
        total_amount: 0,
        shipping_fee: 534,
      };
    }

    case TOGGLE_CART_ITEM_AMOUNT: {
      const { id, amount } = action.payload;
      const tempItem = state.cart.find((i) => i.id === id);
      const newItem = { ...tempItem, amount };
      const otheritems = state.cart.filter((i) => i.id !== id);
      return { ...state, cart: [...otheritems, newItem] };
    }

    case COUNT_CART_TOTALS: {
      let total_amount = 0;
      let total_items = 0;
      for (const cartItem of state.cart) {
        total_items += cartItem.amount;
        total_amount += cartItem.amount * cartItem.price;
      }
      return { ...state, total_amount, total_items };
    }

    case REMOVE_CART_ITEM: {
      const newCart = state.cart.filter((item) => item.id !== action.id);
      return { ...state, cart: newCart };
    }

    default: {
      throw new Error(`No Matching "${action.type}" - action type`);
    }
  }
};

export default cart_reducer;
