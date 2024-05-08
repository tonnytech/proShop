import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../../../services/userServices';
import { setLocalStorage, getLocalStorage } from '../../../constants/constants';


const initialState = {
  loginUserInfo: getLocalStorage('LoginUser'),
  isLoading: false,
  error: null,
  isSuccessfull: false,
};

const loginUserSlice = createSlice({
  name: 'loginUserList',
  initialState,
  reducers: {
    logoutUser() {
    localStorage.removeItem('LoginUser')
    }
  },
  extraReducers: (builder) => {
    // fetch all existing user
    builder
      .addCase(loginUser.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(loginUser.fulfilled, (state, action) => {
        const loginReturn = {
          ...state,
          loginUserInfo: action.payload,
          isLoading: false,
          isSuccessfull: true,
        }
        setLocalStorage('LoginUser', loginReturn.loginUserInfo);
        return loginReturn;
  })
      .addCase(loginUser.rejected, (state, action) => {
        const rejectReturn = {
          ...state,
          error: action.payload,
          isLoading: false,
        }
        return rejectReturn;
      })
  },
});

export const { logoutUser } = loginUserSlice.actions;
export default loginUserSlice.reducer;