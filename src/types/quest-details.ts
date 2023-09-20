import { QuestPreview } from './quest-preview';

export type QuestDetails = QuestPreview & {
  description: string;
  coverImg: string;
  coverImgWebp: string;
};
