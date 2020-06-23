import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import ResizeObserver from "resize-observer-polyfill";


import Map from './components/Map';

export default class App extends Component {

  constructor(props) {
    super(props);

    
    this.state = {
      
    }

  }

  componentDidMount() {
    this.resizeObserver = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;

      this.setState({
        width: Math.floor(width),
        height: Math.floor(height)
      });

    });

    this.resizeObserver.observe(document.getElementById('app'));
  }

  componentWillUnmount() {
    this.resizeObserver.disconnect();
  }


  render() {
    return (
      <Fragment>
        <Map></Map>
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));