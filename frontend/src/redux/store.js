import { configureStore } from '@reduxjs/toolkit';
import getProductsSlice from './slices/productSlices'

// import { productListReducer } from '../reducers/productReducers';

const store = configureStore({
    reducer: {
        productListReducer: getProductsSlice
    }
  });
  
  export default store;