// cartSlice.js (Redux slice)
import { createSlice } from "@reduxjs/toolkit";
import { putOrder, getOrderDetails } from "../../services/orderServices";

const initialState = {
  order: [],
  isLoading: false,
  error: null,
  isSuccessfull: false,
  singleOrderDetails: [],
};

const orderSlice = createSlice({
  name: "order_slice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(putOrder.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(putOrder.fulfilled, (state, action) => ({
        ...state,
        order: action.payload,
        isLoading: false,
        isSuccessfull: true,
      }))
      .addCase(putOrder.rejected, (state, action) => ({
        ...state,
        error: action.payload,
        isLoading: false,
      }));

    builder
      .addCase(getOrderDetails.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(getOrderDetails.fulfilled, (state, action) => ({
        ...state,
        singleOrderDetails: action.payload,
        isLoading: false,
        isSuccessfull: true,
      }))
      .addCase(getOrderDetails.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          isLoading: false,
        };
      });
  },
});

export default orderSlice.reducer;
