import { createSlice } from '@reduxjs/toolkit';
import { fetchProduct } from '../../services/productServices';

// Set the initial state
export const initialState = {
  product: [],
  isLoading: false,
  error: null,
  isSuccessfull: false,
};

const getSingleProductSlice = createSlice({
  name: 'singleProduct',
  initialState,
  reducers: {
    resetSuccessful: (state) => ({ ...state, isSuccessfull: false }),
  },
  extraReducers: (builder) => {
    // fetch all existing houses
    builder
      .addCase(fetchProduct.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchProduct.fulfilled, (state, action) => ({
        ...state,
        product: action.payload,
        isLoading: false,
        isSuccessfull: true
      }))
      .addCase(fetchProduct.rejected, (state, action) => ({
        ...state,
        error: action.payload,
        isLoading: false,
      }));
  },
});

export const { resetSuccessful } = getSingleProductSlice.actions;
export default getSingleProductSlice.reducer;