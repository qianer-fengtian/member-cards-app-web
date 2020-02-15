import moment from 'moment'

export const convertUnixMillsToISODate = (mills: number) => {
  return moment(mills).format('YYYY-MM-DD')
}

export const convertISODateToUnixMills = (date: string) => {
  return +moment(date)
}