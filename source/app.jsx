import { h, render, Component } from 'preact'
import { Intro } from './components/intro'
import { Story } from './components/story'
import { Timeline } from './components/timeline'
import stories from './stories'
import 'normalize.css'
import { wrap } from './app.css'
import { Router, route} from 'preact-router';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
}

class App extends Component {
  state = {
    showIntro: false
  }

  select = ({ year, month, day }) => {
    if (stories[`${year}_${month}_${day}`]) {
      this.setState({
        story: stories[`${year}_${month}_${day}`],
        showStory: true
      })
    }
  }

  componentDidMount () {
    setTimeout(() => { this.setState({ showIntro: true })}, 1000)
  }

  onIntroShown = () => {
    setTimeout(() => {
      this.setState({ showIntro: false })
    }, 500)
  }

  onIntroHidden = () => {
  }

  render (props, { showIntro, showStory, story }) {
    return (
      <div className={wrap}>
        <Router>
          <Intro
            path='/'
            toggle={showIntro}
            onShown={this.onIntroShown}
            onHidden={this.onIntroHidden}
          />
          <div path='/calendar'>
            <Timeline onSelect={this.select} />
            <Story show={showStory} story={story} onClose={() => { this.setState({ showStory: false }) }} />
          </div>
        </Router>
      </div>
    )
  }
}

render(<App />, document.body)
