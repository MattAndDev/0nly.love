import { h, Component } from 'preact'

import { Title } from '../title'
import { wrap } from './intro.css'

export class Intro extends Component {
  state = {
    showMain: false,
    showSub: false,
    finished: false,
    isAnimating: false,
    showSoon: false
  }

  static defaultProps = {
    toggle: true,
    onShown: () => {},
    onHidden: () => {}
  }

  show () {
    this.setState({ showMain: true, isAnimating: true })
    setTimeout(() => {
      this.setState({ showSub: true })
    }, 1200)
    setTimeout(() => {
      this.setState({ showSoon: true })
    }, 2500)
  }

  hide () {
    this.setState({ showMain: false, showSub: false, isAnimating: true })
  }

  subShown = () => {
    this.setState({ visible: true, isAnimating: false })
    this.props.onShown()
  }

  subHidden = () => {
    this.setState({ visible: false, isAnimating: false })
    this.setState({ showSoon: false })
    this.props.onHidden()
  }

  render ({
    toggle,
    onShown,
    onHidden
  }, {
    showMain,
    showSub,
    showSoon,
    visible,
    isAnimating
  }) {
    if (toggle && !isAnimating && !visible) this.show()
    if (!toggle && !isAnimating && visible) this.hide()
    return (
      <div className={wrap} >
        <div>
          <Title
            size='xl'
            toggle={showMain}
            hideUnderline
            text='my.0nly.love'
          />
        </div>
        <div>
          <Title
            size='md'
            toggle={showSub}
            onShown={this.subShown}
            onHidden={this.subHidden}
            hideUnderline
            text='A brief history of our life together'
          />
        </div>
        <Title
          size='sm'
          toggle={showSoon}
          onShown={this.subShown}
          onHidden={this.subHidden}
          text='Coming soon'
        />
      </div>
    )
  }
}
