// cartSlice.js (Redux slice)
import { createSlice } from '@reduxjs/toolkit';
import { setLocalStorage, getLocalStorage } from '../../constants/constants';

const cartInitialState = () => {
  const storedCart = getLocalStorage('cartItems');
  let returnArray = [...(storedCart || [])];
  if (returnArray===undefined){
    returnArray = [];
    return returnArray;
  }
  return returnArray || [];
};

const initialState = {
  cartItems: cartInitialState(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      // let cartItem;
      if(action.payload.product){
      const cartItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.product === cartItem.product);
      if(existingItem){
          const currentItem = {
              ...state,
              cartItems: state.cartItems.map(x => x.product === existingItem.product ? cartItem : x)
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
      } else {
        return
      }
    
    },

    removeFromCart(state, action) {
    const currentItems = {
      ...state,
      cartItems: state.cartItems.filter((x)=>x.product !== action.payload)
    }
    console.log(currentItems)
    setLocalStorage('cartItems', [...currentItems.cartItems]);
    
    return currentItems;
    }
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
