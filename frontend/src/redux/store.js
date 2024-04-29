import { configureStore } from '@reduxjs/toolkit';
import getProductsSlice from './slices/productSlices'
import getSingleProductSlice from './slices/singleProduct'
import cartSlicle from './slices/cartSlicle';
import registerUserSlice from './slices/user/registerUserSlice';
import loginUserSlice from './slices/user/loginUserSlice';
// import { productListReducer } from '../reducers/productReducers';

const store = configureStore({
    reducer: {
        productListReducer: getProductsSlice,
        singleProductReducer: getSingleProductSlice,
        cartProductReducer: cartSlicle,
        registeredUserReducer: registerUserSlice,
        loginUserReducer: loginUserSlice
    }
  });
  
  export default store;