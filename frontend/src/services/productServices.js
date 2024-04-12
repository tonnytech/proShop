import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
    'houses/fetchHouses',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get('/api/products');
        console.log(response.data);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
    },
  );