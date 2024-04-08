import { configureStore } from '@reduxjs/toolkit';

import { productListReducer } from './reducers/productReducers';
const store = configureStore({
    reducer: {
        productListReducer: productListReducer
    }
  });
  
  export default store;