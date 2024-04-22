// cartSlice.js (Redux slice)
import { createSlice } from '@reduxjs/toolkit';
import { setLocalStorage } from '../../constants/constants';
import { getLocalStorage } from '../../constants/constants';

export const cartInitialState = () => {
    const storedCart = getLocalStorage('cartItems');
    return storedCart ? storedCart : [];
  };

const initialState = {
  cartItems: cartInitialState(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
     const cartItem = action.payload;
     const existingItem = state.cartItems.find((item) => item._id === cartItem._id);
     if(existingItem){
        const currentItem = {
            ...state,
            cartItems: state.cartItems.map(x => x._id === existingItem._id ? cartItem : x)
        }
        setLocalStorage('cartItems', [...currentItem.cartItems]);
        return currentItem;
     } else {
        const currentItem = {
            ...state,
            cartItems: [...state.cartItems, cartItem]
        }
        setLocalStorage('cartItems', [...currentItem.cartItems]);
        return currentItem;
     }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
