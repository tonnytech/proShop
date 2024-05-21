import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
    'houses/fetchHouses',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get('/api/products');
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
    },
  );

  export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    async (id, thunkAPI) => {
      try {
        const response = await axios.get(`/api/products/${id}`)
        return response.data;
      } catch ( error) {
        return thunkAPI.rejectWithValue(error.message)
      }
    }
  )