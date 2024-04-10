import { createSlice } from '@reduxjs/toolkit';
import {fetchProducts} from '../../services/productServices';

// Set the initial state
export const initialState = {
  products: [],
  isLoading: false,
  error: null,
  isSuccessfull: false,
};

const getProductsSlice = createSlice({
  name: 'ProductList',
  initialState,
  reducers: {
    resetSuccessful: (state) => ({ ...state, isSuccessfull: false }),
  },
  extraReducers: (builder) => {
    // fetch all existing houses
    builder
      .addCase(fetchProducts.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchProducts.fulfilled, (state, action) => ({
        ...state,
        products: action.payload,
        isLoading: false,
      }))
      .addCase(fetchProducts.rejected, (state) => ({
        ...state,
        error: 'Error',
        isLoading: false,
      }));
  },
});

export const { resetSuccessful } = getProductsSlice.actions;
export default getProductsSlice.reducer;