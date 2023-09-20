import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../config';

export const redirectToRoute = createAction<AppRoute>('user/redirectToRoute');
