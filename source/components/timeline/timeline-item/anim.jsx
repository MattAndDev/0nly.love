import { Component } from 'preact'

export class Anim extends Component {
  _s = () => {
    this.setState({ _animating: true })
    this.show(() => {
      this.setState({ _animating: false, _visible: true })
      this.props.onShown && this.props.onShown()
    })
  }

  _h = () => {
    this.setState({ _animating: true })
    this.hide(() => {
      this.setState({ _animating: false, _visible: false })
      this.props.onHidden && this.props.onHidden()
    })
  }

  show = (c) => { c() }

  hide = (c) => { c() }

  evalAnim = () => {
    const { hide } = this.props
    const { _animating, _visible } = this.state
    if (!hide && !_animating && !_visible) this._s()
    if (hide && !_animating && _visible) this._h()
  }
}
