const defaultEnd = { year: new Date().getFullYear() }
const defaultStart = { year: 2012 }

export const generate = (start = defaultStart, end = defaultEnd) => {
  return new Array(end.year - start.year + 1).fill(null).map((_, year) => {
    return {
      year: start.year + year,
      months: new Array(12).fill().map((_, month) => {
        const nDays = new Date(start.year + year, month + 1, 0).getDate()
        return {
          days: new Array(nDays).fill().map((_, day) => {
            return {
              weekday: new Date(`${year}.${month + 1}.${day + 1}`).getDay(),
              day
            }
          }),
          month
        }
      })
    }
  })
}
