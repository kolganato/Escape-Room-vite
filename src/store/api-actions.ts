import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AppRoute } from '../config';
import {
  CombinedFormBookingData,
  CombinedType,
  ReservationDetails,
} from '../types/api-types';
import { QuestPreview } from '../types/quest-preview';
import { QuestDetails } from '../types/quest-details';
import { User } from '../types/user';
import { AuthData } from '../types/auth-data';
import { dropToken, saveToken } from '../services/token';
import { redirectToRoute } from './actions';
import { Booking } from '../types/booking';

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

export const fetchBookingAction = createAsyncThunk<
  Booking[],
  string,
  CombinedType
>('quests/fetchBooking', async (questId, { extra: api }) => {
  const { data } = await api.get<Booking[]>(
    `${APIRoute.Quest}/${questId}/booking`
  );

  return data;
});

export const bookingQuestAction = createAsyncThunk<
  ReservationDetails,
  CombinedFormBookingData,
  CombinedType
>('quests/bookingQuest', async ({ formData, id }, { extra: api }) => {
  const { data } = await api.post<ReservationDetails>(
    `${APIRoute.Quest}/${id}/booking`,
    formData
  );

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
  async ({ login: email, password }, { extra: api }) => {
    const { data } = await api.post<User>(APIRoute.Login, { email, password });
    saveToken(data.token);
    redirectToRoute(AppRoute.Root);
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

export const fetchReservationAction = createAsyncThunk<
  ReservationDetails[],
  undefined,
  CombinedType
>('quests/fetchReservation', async (_arg, { extra: api }) => {
  const { data } = await api.get<ReservationDetails[]>(APIRoute.Reservation);
  return data;
});

export const deleteReservationAction = createAsyncThunk<
  ReservationDetails['id'],
  ReservationDetails['id'],
  CombinedType
>('quests/deleteReservation', async (reservationId, { extra: api }) => {
  await api.delete<ReservationDetails['id']>(`${APIRoute.Reservation}/${reservationId}`);

  return reservationId;
});
