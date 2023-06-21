import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  basket: {
    basketItems: localStorage.getItem('basketItems')
      ? JSON.parse(localStorage.getItem('basketItems'))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'BASKET_ADD_ITEM':
      //add to cart
      const newItem = action.payload;
      const existItem = state.basket.basketItems.find(
        (item) => item._id === newItem._id
      );
      const basketItems = existItem
        ? state.basket.basketItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.basket.basketItems, newItem];
      localStorage.setItem('basketItems', JSON.stringify(basketItems));
      return { ...state, basket: { ...state.basket, basketItems } };
    case 'BASKET_REMOVE_ITEM': {
      const basketItems = state.basket.basketItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('basketItems', JSON.stringify(basketItems));

      return { ...state, basket: { ...state.basket, basketItems } };
    }
    default:
      return state;
  }
}

// HOF Higher order function

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}
