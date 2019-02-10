import { h, render, Component } from 'preact'
import { Story } from './components/story'
import { Timeline } from './components/timeline'
import stories from './stories'
import 'normalize.css'
import { wrap } from './app.css'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
}

class App extends Component {
  state = {
    showStory: false
  }

  select = ({ year, month, day }) => {
    if (stories[`${year}_${month}_${day}`]) {
      this.setState({
        story: stories[`${year}_${month}_${day}`],
        showStory: true
      })
    }
  }

  render (props, { showStory, story }) {
    return (
      <div className={wrap}>
        <Timeline onSelect={this.select} />
        <Story show={showStory} story={story} onClose={() => { this.setState({ showStory: false }) }} />
      </div>
    )
  }
}

render(<App />, document.body)
