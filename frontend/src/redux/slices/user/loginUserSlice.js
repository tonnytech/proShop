import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../../../services/productServices';

// Set the initial state
export const initialState = {
  loginUserInfo: [],
  isLoading: false,
  error: null,
  isSuccessfull: false,
};

const loginUserSlice = createSlice({
  name: 'loginUserList',
  initialState,
  reducers: {
    resetSuccessful: (state) => ({ ...state, isSuccessfull: false }),
  },
  extraReducers: (builder) => {
    // fetch all existing user
    builder
      .addCase(fetchProducts.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchProducts.fulfilled, (state, action) => ({
        ...state,
        userInfo: action.payload,
        isLoading: false,
        isSuccessfull: true
      }))
      .addCase(fetchProducts.rejected, (state, action) => ({
        ...state,
        error: action.payload,
        isLoading: false,
      }));
  },
});

export const { resetSuccessful } = loginUserSlice.actions;
export default loginUserSlice.reducer;