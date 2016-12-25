import React, { Component } from 'react';

import StaticLetterFrequencies from './static-frequencies';

export default class DynamicLetterFrequencies extends Component {
  constructor(props) {
    super(props);

    this.state = { letters: props.route.letters.map((l) => Object.assign({}, l)) };

    this.interval = setInterval(() => {
      const letter = this.state.letters[Math.floor(Math.random() * 26)];
      letter.frequency = Math.random() * (0.25 - 0.01) + 0.01;
      this.setState({letters: this.state.letters});
    }, 50);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    return <StaticLetterFrequencies letters={this.state.letters} />;
  }
}
