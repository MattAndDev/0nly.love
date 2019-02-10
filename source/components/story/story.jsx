import { h, Component } from 'preact'
import { tween } from 'popmotion'

import { Title } from '../title'
import { wrap, close } from './story.css'

export class Story extends Component {
  state = {
    opactity: 0,
    translateY: 40,
    isAnimating: false,
    showTitle: false,
    hide: false,
    visible: false
  }

  show = () => {
    this.setState({ isAnimating: true })
    tween({ to: 0, from: 40, duration: 500 }).start(v => this.setState({ translateY: v }))
    tween({ to: 1, duration: 400 }).start({
      update: v => this.setState({ opacity: v }),
      complete: v => this.setState({ showTitle: true, isAnimating: false, visible: true })
    })
  }

  hide = () => {
    this.setState({ showTitle: false, isAnimating: true })
    setTimeout(() => {
      tween({ to: 40, from: 0, duration: 600 }).start(v => this.setState({ translateY: v }))
      tween({ to: 0, from: 1, duration: 500 }).start({
        update: v => this.setState({ opacity: v }),
        complete: v => this.setState({ isAnimating: false, visible: false })
      })
    }, 1000)
  }

  render ({ story = { title: '' }, onClose, show, hide }, { opacity, isAnimating, translateY, showTitle, visible }) {
    if (show && !isAnimating && !visible) this.show()
    if (!show && !isAnimating && visible) this.hide()
    return (
      <div style={{ opacity, transform: `translate(0,${translateY}%)` }} class={wrap} >
        <p className={close} onClick={onClose}>X</p>
        <Title size='md' show={showTitle} text={story.title} />
      </div>
    )
  }
}
