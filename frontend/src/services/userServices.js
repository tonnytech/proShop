import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getLocalStorage } from "../constants/constants";

export const registerUser = createAsyncThunk(
  'user/register',
  async (id, thunkAPI) => {
    const {name, email, password} = id;
    const config = {
      header: {
        'content-Type': 'application/json'
      }
    }
    try {
      const response = await axios.post('/api/users',{name, email, password}, config)
      return response.data;
    } catch ( error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

  export const loginUser = createAsyncThunk(
    'user/login',
    async (id, thunkAPI) => {
      const {email, password} = id;
      const config = {
        header: {
          'content-Type': 'application/json'
        }
      }
      try {
        const response = await axios.post('/api/users/login',{email, password}, config)
        return response.data;
      } catch ( error) {
        return thunkAPI.rejectWithValue(error.message)
      }
    }
  )


export const updateUserOrGetUser = createAsyncThunk(
  'user/updateOrGetUser',
  async ({ updateInfo, isUpdate }, thunkAPI) => {
    const token = getLocalStorage('UserToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    try {
      let response;
      if (isUpdate) {
        response = await axios.put('/api/users/profile', updateInfo, config);
      } else {
        response = await axios.get('/api/users/profile', config);
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
