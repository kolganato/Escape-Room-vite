import { Level, TypeLevel } from '../config';

export type QuestPreview = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: Level;
  type: TypeLevel;
  peopleMinMax: [number, number];
};
