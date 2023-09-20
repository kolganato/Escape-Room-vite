import { AppDispatch } from '../store/store';
import { AxiosInstance } from 'axios';

export type CombinedType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};
