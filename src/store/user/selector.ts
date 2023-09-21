import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../config';
import { UserState } from './user-slice';
import { State } from '..';

export const getAuthorizationStatus = createSelector(
  (state: Pick<State, NameSpace.User>) => state[NameSpace.User],
  (state: UserState) => state.authorizationStatus
);

export const getUserInfo = createSelector(
  (state: Pick<State, NameSpace.User>) => state[NameSpace.User],
  (state: UserState) => state.userInfo
);

export const getLoginStatus = createSelector(
  (state: Pick<State, NameSpace.User>) => state[NameSpace.User],
  (state: UserState) => state.loginStatus
);
