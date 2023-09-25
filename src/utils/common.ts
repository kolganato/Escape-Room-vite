import { Date } from '../config';
import { Day } from '../types/day';
import { Location } from '../types/location';

export const TILE_LAYER =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
export const COPYRIGHT =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export const URL_MARKER_DEFAULT = './img/svg/pin-default.svg';

export const URL_MARKER_CURRENT = './img/svg/pin-active.svg';

export const ZOOM_MAP = 10;

export const COORDS_CENTER_CITY = [59.93863,30.31413];

export const COORDS_ADDRESS_OFFICE: Location = {
  coords: [59.968452,30.317556],
  address: 'Санкт-Петербург, Набережная реки Карповка, д 5П'
};

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
