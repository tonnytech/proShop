import { createSlice } from '@reduxjs/toolkit';
import { loginUser, updateUserOrGetUser } from '../../../services/userServices';
import { setLocalStorage, getLocalStorage } from '../../../constants/constants';
import { arrayToObject } from '../../../constants/constants';

const prevUser = arrayToObject(getLocalStorage('LoginUser'))


const initialState = {
  loginUserInfo: prevUser,
  userProfile: [],
  isLoading: false,
  error: null,
  isLoggedIn: false,
  isSuccessfull: false,
};

const loginUserSlice = createSlice({
  name: 'loginUserList',
  initialState,
  reducers: {
    logoutUser(state, action) {
      const removedUser = {
        ...state,
        loginUserInfo: [],
        userProfile: [],
        isLoggedIn: false,
      }
    localStorage.removeItem('LoginUser')
    localStorage.removeItem('UserToken')
    return removedUser
    }
  },
  extraReducers: (builder) => {
    // handle user login
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
          isLoggedIn: true,
        }
        setLocalStorage('LoginUser', loginReturn.loginUserInfo);
        setLocalStorage('UserToken', loginReturn.loginUserInfo.token)
        return loginReturn;
        })
      .addCase(loginUser.rejected, (state, action) => {
        const rejectReturn = {
          ...state,
          error: action.payload,
          isLoggedIn: false,
          isLoading: false,
        }
        return rejectReturn;
      })

      //handle update user
    .addCase(updateUserOrGetUser.pending, (state) => ({
      ...state,
      isLoading: true,
    }))
      .addCase(updateUserOrGetUser.fulfilled, (state, action) => {
        const updatedUserReturn = {
          ...state,
          userProfile: action.payload,
          isLoading: false,
          isSuccessfull: true,
        };
        setLocalStorage('LoginUser', updatedUserReturn.userProfile);
        return updatedUserReturn;
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

export const { logoutUser } = loginUserSlice.actions;
export default loginUserSlice.reducer;