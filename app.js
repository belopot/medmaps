import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import ResizeObserver from "resize-observer-polyfill";

import { FlyToInterpolator } from 'react-map-gl';

export default class App extends Component {

  constructor(props) {
    super(props);

    
    this.state = {
      viewState: {
        longitude: 44.127197,
        latitude: 28.5404328,
        zoom: 2.5,
        maxZoom: 16,
        pitch: 35,
        bearing: 0
      }
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
        <div></div>
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));