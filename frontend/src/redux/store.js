import { configureStore } from "@reduxjs/toolkit";
import getProductsSlice from "./slices/productSlices";
import getSingleProductSlice from "./slices/singleProduct";
import cartSlicle from "./slices/cartSlicle";
import registerUserSlice from "./slices/user/registerUserSlice";
import loginUserSlice from "./slices/user/loginUserSlice";
import paymentAndShipping from "./slices/paymentAndShipping";
import orderSlice from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    productListReducer: getProductsSlice,
    singleProductReducer: getSingleProductSlice,
    cartProductReducer: cartSlicle,
    registerUserSlice: registerUserSlice,
    loginUserSlice: loginUserSlice,
    paymentAndShipping: paymentAndShipping,
    orderSlice: orderSlice,
  },
});

export default store;
