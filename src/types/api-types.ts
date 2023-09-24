import { AppDispatch, State } from '../store';
import { AxiosInstance } from 'axios';
import { Booking } from './booking';
import { Day } from './day';
import { Date } from '../config';
import { QuestDetails } from './quest-details';
import { Reservation } from './reservation';

export type CombinedType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export type FormBookingData = {
  date: Date;
  time: Day['time'];
  contactPerson: string;
  phone: string;
  peopleCount: number;
  withChildren: boolean;
  placeId: Booking['id'];
};

export type CombinedFormBookingData = {
  formData: FormBookingData;
  id: QuestDetails['id'];
};

export type ReservationDetails = Reservation & FormBookingData;
