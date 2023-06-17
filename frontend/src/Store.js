import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  basket: {
    basketItems: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'BASKET_ADD_ITEM':
      //add to cart
      return {
        ...state,
        basket: {
          ...state.basket,
          basketItems: [...state.basket.basketItems, action.payload],
        },
      };
    default:
      return state;
  }
}

// HOF Higher oreder function

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}
