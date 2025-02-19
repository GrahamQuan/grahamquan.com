import { format } from 'date-fns';

export function formatDate(date: number | string) {
  return format(new Date(date), 'yyyy/MM/dd');
}
