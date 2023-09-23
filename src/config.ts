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

export enum APIRoute {
  Quest = '/quest',
  Reservation = '/reservation',
  Login = '/login',
  Logout = '/logout',
}

export enum TypeLevel {
  Adventures = 'adventures',
  Horror = 'horror',
  Mystic = 'mystic',
  Detective = 'detective',
  SciFi = 'sci-fi',
  All = 'all-quests',
}

export const LEVEL_TYPES = {
  [TypeLevel.All]: 'Все квесты',
  [TypeLevel.Adventures]: 'Приключения',
  [TypeLevel.Horror]: 'Ужасы',
  [TypeLevel.Mystic]: 'Мистика',
  [TypeLevel.Detective]: 'Детектив',
  [TypeLevel.SciFi]: 'Sci-fi',
};

export const DEFAULT_LEVEL_TYPES = TypeLevel.All;

export enum Level {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
  All = 'all',
}

export const LEVELS = {
  [Level.All]: 'Любой',
  [Level.Easy]: 'Простой',
  [Level.Medium]: 'Средний',
  [Level.Hard]: 'Сложный',
};

export const DEFAULT_LEVELS = Level.All;

export enum Date {
  Today = 'today',
  Tomorrow = 'tomorrow',
}

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}
