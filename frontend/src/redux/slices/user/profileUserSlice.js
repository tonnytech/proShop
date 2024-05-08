import { createSlice } from '@reduxjs/toolkit';
import { updateUserOrGetUser } from '../../../services/userServices';
import { setLocalStorage } from '../../../constants/constants';

const initialState = {
  userProfile: [],
  isLoading: false,
  error: null,
  isSuccessfull: false,
};

const profileUserSlice = createSlice({
  name: 'loginUserList',
  initialState,
  extraReducers: (builder) => {
    // fetch all existing user
    builder
      .addCase(updateUserOrGetUser.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(updateUserOrGetUser.fulfilled, (state, action) => {
        const profileReturn = {
          ...state,
          userProfile: action.payload,
          isLoading: false,
          isSuccessfull: true,
        }
        setLocalStorage('LoginUser', profileReturn.userProfile);
        return profileReturn;
  })
      .addCase(updateUserOrGetUser.rejected, (state, action) => {
        const rejectReturn = {
          ...state,
          error: action.payload,
          isLoading: false,
        }
        return rejectReturn;
      })
  },
});

export default profileUserSlice.reducer;