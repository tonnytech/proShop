import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (id, thunkAPI) => {
      try {
        const response = await axios.get(`/api/products/${id}`)
        return response.data;
      } catch ( error) {
        console.log(error.message)
        return thunkAPI.rejectWithValue(error.message)
      }
    }
  )

  export const loginUser = createAsyncThunk(
    'user/loginUnser',
    async (id, thunkAPI) => {
      try {
        const response = await axios.get(`/api/products/${id}`)
        return response.data;
      } catch ( error) {
        console.log(error.message)
        return thunkAPI.rejectWithValue(error.message)
      }
    }
  )