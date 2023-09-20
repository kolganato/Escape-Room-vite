import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../config';
import questsSlice from './quests/quests-slice';
import userSlice from './user/user-slice';

export const rootReducer = combineReducers({
  [NameSpace.Quests]: questsSlice,
  [NameSpace.User]: userSlice,
});
