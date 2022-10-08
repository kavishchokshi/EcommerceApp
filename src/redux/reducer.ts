import {ADD_ITEM, REMOVE_ITEM} from './types';

const initialState = {
  cartList: [],
  total: 0,
};

export const reducer: any = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_ITEM: {
      const updatedCart: any = [...state.cartList];
      const item = updatedCart.find(
        (i: {id: number}) => i.id === action.payload.id,
      );
      if (item) {
        item.count = item.count + 1;
      } else {
        action.payload.count = 1;
        updatedCart.push(action.payload);
      }
      return {
        cartList: updatedCart,
        total: state.total + 1,
      };
    }
    case REMOVE_ITEM: {
      let updatedCart = [...state.cartList];
      const item = updatedCart.find(
        (element: {id: number}) => element.id === action.payload.id,
      );
      if (item && action.payload.count > 1) {
        action.payload.count--;
      } else {
        updatedCart = state.cartList.filter(
          (i: {id: number}) => i.id !== action.payload.id,
        );
      }
      return {...state, cartList: updatedCart, total: state.total - 1};
    }
    default:
      return state;
  }
};
