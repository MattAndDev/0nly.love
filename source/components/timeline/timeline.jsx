import { h, Component } from 'preact'
import style, { grid, highlighted, back } from './timeline.css'
import stories from '../../stories'

const start = { day: 12, month: 10, year: 2017 }
var today = new Date()
const end = { day: today.getDate(), month: today.getMonth() + 1, year: today.getFullYear() }

const calender = new Array(end.year - start.year + 1).fill(null).map((_, i) => {
  const skipMonths = (i === 0) ? start.month : (i === end.year - start.year) ? (12 - end.month) : 0
  return {
    year: start.year + i,
    months: new Array(12 - skipMonths).fill().map((_, month) => {
      if (i === 0) month += skipMonths
      const nDays = new Date(start.year + i, month + 1, 0).getDate()
      let highlighted = false
      return {
        days: new Array(nDays).fill().map((_, day) => {
          if (stories[`${start.year + i}_${month}_${day}`]) highlighted = true
          return {
            index: day,
            highlighted: stories[`${start.year + i}_${month}_${day}`]
          }
        }),
        index: month,
        highlighted
      }
    })
  }
})

export class Timeline extends Component {
  state = {
    year: false,
    month: false,
    display: 'years'
  }

  back = () => {
    const { month } = this.state
    if (month !== false) {
      this.setState({ month: false, day: false })
      return false
    }
    this.setState({ year: false, display: 'years' })
  }

  selectDay = (i) => {
    const { year, month } = this.state
    this.setState({ day: i })
    this.props.onSelect({ year, month, day: i })
  }

  selectMonth = (i) => {
    this.setState({ month: i, display: 'days' })
  }

  selectYear = (i) => {
    this.setState({ year: i, display: 'months' })
  }

  render (props, { year, month, day, display }) {
    return (
      <div>
        {year && <p className={back} onClick={this.back}>Zrück</p>}
        {!year && <p className={back} >{'\u00a0'}</p>}
        <div className={`${grid} ${style[display]}`}>
          {!year && calender.map((t) => (
            <div onClick={() => this.selectYear(t.year)}>
              <span>{t.year}</span>
            </div>
          ))}
          {year && month === false && calender.find(y => (y.year === year)).months.map(({ index, highlighted: high }) => (
            <div className={high && highlighted} onClick={() => this.selectMonth(index)} >
              <span>{new Date(year, index, 1).toLocaleString('de', { month: 'long' })}</span>
            </div>
          ))}
          {month !== false && calender.find(y => (y.year === year)).months.find((m) => m.index === month).days.map((_, i) => (
            <div className={_.highlighted && highlighted} onClick={() => { this.selectDay(i) }}>
              <span>{new Date(year, month, i + 1).toLocaleString('de', { weekday: 'long' })}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
