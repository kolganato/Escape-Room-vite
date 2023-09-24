import { Date } from '../config';
import { Day } from '../types/day';

export const TILE_LAYER =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
export const COPYRIGHT =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export const URL_MARKER_DEFAULT = './img/svg/pin-default.svg';

export const URL_MARKER_CURRENT = './img/svg/pin-active.svg';

export const ZOOM_MAP = 11;

export function formateTimeForForm(time: string) {
  return time.replace(/([\d]+):([\d]+)/, '$1h$2m');
}

export function formateDateForPost(data: string): {
  date: Date;
  time: Day['time'];
} {
  const date = data.replace(/([a-zA-Z]+)([\d]+)h([\d]+)m/, '$1');
  const time = data.replace(/([a-zA-Z]+)([\d]+)h([\d]+)m/, '$2:$3');

  return { date, time };
}
