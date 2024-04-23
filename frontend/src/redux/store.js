import { configureStore } from '@reduxjs/toolkit';
import getProductsSlice from './slices/productSlices'
import getSingleProductSlice from './slices/singleProduct'
import cartSlicle from './slices/cartSlicle';

// import { productListReducer } from '../reducers/productReducers';

const store = configureStore({
    reducer: {
        productListReducer: getProductsSlice,
        singleProductReducer: getSingleProductSlice,
        cartProductReducer: cartSlicle,
    }
  });
  
  export default store;