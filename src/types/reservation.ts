import { Location } from './location';
import { QuestPreview } from './quest-preview';

export type Reservation = {
  id: string;
  location: Location;
  quest: QuestPreview;
};
