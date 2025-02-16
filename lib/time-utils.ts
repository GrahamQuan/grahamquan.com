import dayjs from 'dayjs';

export function formatDate(date: number | string) {
  return dayjs(date).format('YYYY/MM/DD');
}
