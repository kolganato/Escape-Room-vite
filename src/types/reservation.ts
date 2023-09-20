import { Location } from './location';
import { QuestPreview } from './quest-preview';

export type Reservation = QuestPreview & {
  id: string;
  location: Location;
  quest: QuestPreview;
};
