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

import FormattedSource from '../components/formatted-source';

const SOURCE_CODE = require('source-loader!../example-components/static-frequencies');
import StaticLetterFrequencies from '../example-components/static-frequencies';

export default class StaticLetterFrequenciesRoute extends Component {
  render() {
    const { letters } = this.props.route;
    return (
      <div>
        <h1>Static Bar Chart</h1>
        <StaticLetterFrequencies letters={letters} width={this.props.width}/>
        <FormattedSource name="Static Bar Chart" source={SOURCE_CODE}
                         jsxSource="https://github.com/timthesinner/react-vdom/blob/master/example/letters/static-frequencies.jsx"
                         originalSource="https://bl.ocks.org/mbostock/3885304"/>
      </div>
    );
  }
}
