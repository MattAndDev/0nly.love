import { h, Component } from 'preact'
import { easing, stagger, tween } from 'popmotion'
import styles, { wrap, chunk, underline } from './title.css'

export class Title extends Component {
  state = {
    scaleY: [],
    items: [],
    isAnimating: false,
    visible: false
  }

  static defaultProps = {
    toggle: false,
    onShown: () => {},
    onHidden: () => {}
  }

  show = () => {
    this.setState({ isAnimating: true })
    const tw = tween({ ease: easing.backOut, from: 0, to: 1, duration: 800 })
    this.stag(tw, () => {
      this.setState({ isAnimating: false, visible: true })
      this.props.onShown()
    })
  }

  hide = () => {
    this.setState({ isAnimating: true })
    const tw = tween({ ease: easing.backIn, from: 1, to: 0, duration: 700 })
    this.stag(tw, () => {
      this.setState({ isAnimating: false, visible: false })
      this.props.onHidden()
    })
  }

  stag (animation, complete, reverse) {
    const animations = Array(this.props.text.split('').length).fill(animation)
    stagger(animations, 20).start({
      update: (v) => {
        const { scaleY } = this.state
        for (var i = 0; i < v.length; i++) {
          scaleY[i] = v[i]
        }
        if (reverse) scaleY.reverse()
        this.setState({ scaleY: [...scaleY] })
      },
      complete: () => {
        complete()
      }
    })
  }

  render ({
    size,
    toggle,
    onShown,
    onHidden,
    text,
    hideUnderline
  }, {
    scaleY,
    items,
    isAnimating,
    visible
  }) {
    if (toggle && !isAnimating && !visible) this.show()
    if (!toggle && !isAnimating && visible) this.hide()
    return (
      <div className={`${wrap} ${styles[size]}`}>
        {text.split('').map((x, i) => (
          <span className={chunk} style={{ transform: `scaleY(${scaleY[i] || 0}) translateZ(-1px)` }}>{x === ' ' ? '\u00A0' : x }</span>
        ))}
        {!hideUnderline && visible && <div className={underline} style={{ left: `${100 - scaleY[text.split('').length - 1] * 100}%`, right: 0 }} />}
        {!hideUnderline && !visible && <div className={underline} style={{ right: `${100 - scaleY[text.split('').length - 1] * 100}%` }} />}
      </div>
    )
  }
}
