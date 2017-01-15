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
import { Link } from 'react-router';

import FormattedSource from './formatted-source';

const SOURCE_CODE = require('source-loader!./example');
import Example from './example';

export default class Home extends Component {
  render() {
    const { childRoutes } = this.props.routes[0];
    const source = 'https://github.com/timthesinner/react-vdom/blob/master/example/components/example.jsx';
    return (
      <div className="center">
        <h1>Seamless D3 and React</h1>
        <p>
          Transform your existing D3 charts (or make new ones) and take advantage of React's advanced DOM manipulation and diff capabilitites.  Simply include the VirtualDOM class and pass that off to the D3.select and D3 will emit React nodes instead of using document.createElement.
        </p>
        <hr />
        <div>
          <h3>Simple Example</h3>
          <p>
            Source for this example was adopted from
            <a target="_blank" href="https://bost.ocks.org/mike/circles/">
              Three (4) Little Circles
            </a>
          </p>
        </div>
        <Example />
        <p>
          <span>And the ES6</span>
          <a target="_blank" href={source}>
            source
          </a>
          <span>for this example</span>
        </p>
        <FormattedSource source={SOURCE_CODE} />
      </div>
    );
  }
}
