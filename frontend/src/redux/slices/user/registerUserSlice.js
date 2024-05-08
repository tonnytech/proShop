import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from '../../../services/userServices';
import { setLocalStorage, getLocalStorage } from '../../../constants/constants';


const initialState = {
  registerUserInfo: getLocalStorage('LoginUser'),
  isLoading: false,
  error: null,
  isSuccessfull: false,
};

const registerUserSlice = createSlice({
  name: 'loginUserList',
  initialState,
  extraReducers: (builder) => {
    // fetch all existing user
    builder
      .addCase(registerUser.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(registerUser.fulfilled, (state, action) => {

        const registerReturn = {
          ...state,
          registerUserInfo: action.payload,
          isLoading: false,
          isSuccessfull: true,
        }
        setLocalStorage('LoginUser', registerReturn.registerUserInfo);
        return registerReturn;
  })
      .addCase(registerUser.rejected, (state, action) => {
        const rejectReturn = {
          ...state,
          error: action.payload,
          isLoading: false,
        }
        return rejectReturn;
      });
  },
});

export default registerUserSlice.reducer;