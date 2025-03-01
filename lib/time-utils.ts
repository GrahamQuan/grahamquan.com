import { format } from 'date-fns';

export function formatDate(date: number | string, formatStr: string = 'yyyy/MM/dd') {
  return format(new Date(date), formatStr);
}
