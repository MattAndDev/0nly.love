import { h, Component } from 'preact'
import style, { grid, highlighted, back } from './timeline.css'
import { generate } from '../../api/calendar'
import stories from '../../stories'
import { TimelineItem } from './timeline-item'

const start = { day: 12, month: 10, year: 2017 }
const calendar = generate(start)
console.log(calendar)
for (var i = 0; i < stories.length; i++) {
  const [year, month, day] = stories[i].date.split('_')
  const yearIndex = calendar.findIndex(y => y.year === parseInt(year))
  calendar[yearIndex].months[month].days[day].highlighted = true
  calendar[yearIndex].months[month].highlighted = true
}

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

  get = () => {
    const { year, month, display } = this.state
    if (display === 'days') {
      return calendar.find(y => (y.year === year)).months
        .find((m, i) => i === month).days.map((d, i) => ({
          text: new Date(year, month, i + 1).toLocaleString('de', { weekday: 'long' }),
          ...d
        }))
    }
    if (display === 'months') {
      return calendar.find(y => (y.year === year)).months.map((m, i) => ({
        text: new Date(year, i, 1).toLocaleString('de', { month: 'long' }),
        ...m
      }))
    }
    return calendar.map(y => ({ text: y.year, ...y }))
  }

  select = (i) => {
    this.setState({ hiding: true })
    if (this.state.display === 'days') {
      return this.setState({ day: i })
    }
    if (this.state.display === 'months') {
      return this.setState({ month: i, _display: 'days' })
    }
    return this.setState({ year: this.get()[i].year, _display: 'months' })
  }

  setVisibility = () => {
    this.setState({ display: this.state._display })
    this.setState({ hiding: false })
  }

  render (props, { year, month, day, display, hiding }) {
    return (
      <div>
        {year && <p className={back} onClick={this.back}>Zrück</p>}
        {!year && <p className={back} >{'\u00a0'}</p>}
        <div className={`${grid} ${style[display]}`}>
          {this.get().map(({ text, highlighted }, i) => (
            <TimelineItem
              onShown={() => { console.log('weeeeew') }}
              text={text}
              hide={hiding}
              highlighted={highlighted}
              delayIn={i * 20}
              delayOut={i * 1}
              onHidden={(i === this.get().length - 1) && this.setVisibility}
              onClick={() => this.select(i)}
            />
          ))}
        </div>
      </div>
    )
  }
}

