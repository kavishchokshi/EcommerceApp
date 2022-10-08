import {ADD_ITEM, REMOVE_ITEM} from './types';

export const addItemToCart = (data: any) => ({
  type: ADD_ITEM,
  payload: data,
});

export const removeItemFromCart = (id: any) => ({
  type: REMOVE_ITEM,
  payload: id,
});
