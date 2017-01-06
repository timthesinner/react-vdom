/**
 * Copyright (c) 2016 TimTheSinner All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 *
 * @author TimTheSinner
 */
import React, { Component } from 'react';

import * as StaticLetterFrequencies from './static-frequencies';

export default class DynamicLetterFrequencies extends Component {
  constructor(props) {
    super(props);

    this.state = { letters: props.letters.map((l) => Object.assign({}, l)) };

    //Randomly update the letters frequency
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
    //Render a new bar chart every state update
    return <StaticLetterFrequencies.default letters={this.state.letters} width={this.props.width}/>;
  }
}
