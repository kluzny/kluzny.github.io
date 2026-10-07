import { format } from 'date-fns'

export function simpleDate(date) {
  return format(date, 'yyyy-MM-dd')
}
