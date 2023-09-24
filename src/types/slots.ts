import { Date } from '../config';
import { Day } from './day';

export type Slots = {
  slots: {
    [Date.Today]: Day[];
    [Date.Tomorrow]: Day[];
  };
};
