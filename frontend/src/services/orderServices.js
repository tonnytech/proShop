import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getLocalStorage } from "../constants/constants";

export const putOrder = createAsyncThunk(
  "order/putOrder",
  async (order, thunkAPI) => {
    const token = getLocalStorage("UserToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post("/api/orders", order, config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "getOrderDetails",
  async (id, thunkAPI) => {
    const token = getLocalStorage("UserToken");
        
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(`/api/orders/${id}`, config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
