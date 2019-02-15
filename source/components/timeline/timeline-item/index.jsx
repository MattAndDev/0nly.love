import { h } from 'preact'
import { Anim } from './anim'
import { wrap, high } from './timeline-item.css'
import { tween, delay } from 'popmotion'

export class TimelineItem extends Anim {
  static defaultProps = {
    delayIn: 0,
    delayOut: 0
  }

  show = (c) => {
    delay(this.props.delayIn).start({
      complete: () => tween({ from: 0, to: 1, duration: 1000 }).start({
        update: (v) => this.setState({ opacity: v }),
        complete: (v) => c()
      })
    })
  }

  hide = (c) => {
    delay(this.props.delayOut).start({
      complete: () => tween({ from: 1, to: 0, duration: 200 }).start({
        update: (v) => this.setState({ opacity: v }),
        complete: (v) => c()
      })
    })
  }

  render ({ text, highlighted, ...rest }, { opacity = 0 }) {
    this.evalAnim()
    return (
      <div className={`${wrap} ${highlighted ? high : ''}`} style={{ opacity }} {...rest}>
        <span>{text}</span>
      </div>
    )
  }
}
