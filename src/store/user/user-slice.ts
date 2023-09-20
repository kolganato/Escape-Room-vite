import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace, Status } from '../../config';
import { checkAuthStatus, loginAction, logoutAction } from '../api-actions';
import { User } from '../../types/user';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  userInfo: User;
  loginStatus: Status;
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: {} as User,
  loginStatus: Status.Idle,
};

const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setLoginStatus: (state, { payload }: PayloadAction<Status>) => {
      state.loginStatus = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthStatus.fulfilled, (state, { payload }) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = payload;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo = {} as User;
      });
  },
});

export const { setLoginStatus } = userSlice.actions;

export default userSlice.reducer;
