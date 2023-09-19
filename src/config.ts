export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  Quests = 'QUESTS',
  User = 'USER',
}

export enum AppRoute {
  Root = '/',
  Quest = '/quest',
  QuestBooking = '/quest/:id/booking',
  Login = '/login',
  NotFound = '*',
  MyQuests = '/my-quests',
  Contacts = '/contacts',
}

export const QUEST_THEMES = [
  'Все квесты',
  'Приключения',
  'Ужасы',
  'Мистика',
  'Детектив',
  'Sci-fi',
];

export const DEFAULT_QUEST_THEME = QUEST_THEMES[0];

export const DIFFICULTY_LEVEL = ['любой', 'простой', 'средний', 'сложный'];

export const DEFAULT_DIFFICULTY_LEVEL = DIFFICULTY_LEVEL[0];
