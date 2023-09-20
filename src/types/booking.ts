import { Location } from './location';
import { Slots } from './slots';

export type Booking = Slots & {
  id: string;
  location: Location;
};
