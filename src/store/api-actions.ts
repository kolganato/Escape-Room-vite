import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AppRoute } from '../config';
import { CombinedType } from '../types/api-types';
import { QuestPreview } from '../types/quest-preview';
import { QuestDetails } from '../types/quest-details';
import { User } from '../types/user';
import { AuthData } from '../types/auth-data';
import { dropToken, saveToken } from '../services/token';
import { redirectToRoute } from './actions';

export const fetchQuestsAction = createAsyncThunk<
  QuestPreview[],
  undefined,
  CombinedType
>('quests/fetchQuests', async (_arg, { extra: api }) => {
  const { data } = await api.get<QuestPreview[]>(APIRoute.Quest);
  return data;
});

export const fetchQuestDetailsAction = createAsyncThunk<
  QuestDetails,
  string,
  CombinedType
>('quests/fetchQuestDetails', async (questId, { extra: api }) => {
  const { data } = await api.get<QuestDetails>(`${APIRoute.Quest}/${questId}`);

  return data;
});

export const checkAuthStatus = createAsyncThunk<User, undefined, CombinedType>(
  'user/checkAuthStatus',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<User>(APIRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<User, AuthData, CombinedType>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<User>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Root));
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, CombinedType>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);
