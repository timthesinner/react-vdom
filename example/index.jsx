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
import {render} from 'react-dom';

import letterData from './letter-frequency-data';
import LetterFrequencies from './letter-frequencies';

document.body.innerHTML = '<div id="body" />';
document.head.innerHTML += `<style>
  .bar {
    fill: steelblue;
  }

  .bar:hover {
    fill: brown;
  }

  .axis--x path {
    display: none;
  }
</style>`;

class DynamicFrequencies extends Component {
  constructor(props) {
    super(props);

    this.state = { letters: props.letters.map((l) => Object.assign({}, l)) };

    setInterval(() => {
      const letter = this.state.letters[Math.floor(Math.random() * 26)];
      letter.frequency = Math.random() * (0.25 - 0.01) + 0.01;
      this.setState({letters: this.state.letters});
    }, 50);
  }

  render() {
    return <LetterFrequencies letters={this.state.letters} />;
  }
}

render((
  <div>
    <LetterFrequencies letters={letterData}/>
    <DynamicFrequencies letters={letterData}/>
  </div>
), document.getElementById('body'));

if (module.hot) {
  module.hot.accept();
}
