import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const putOrder = createAsyncThunk(
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