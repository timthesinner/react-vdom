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

const SOURCE_CODE = require('source-loader!../example-components/epicyclic-gearing');
import EpicyclicGearing from '../example-components/epicyclic-gearing';

export default class EpicyclicGearingRoute extends Component {
  render() {
    return (
      <div>
        <h1>Epicyclic Gearing</h1>
        <EpicyclicGearing/>
        <FormattedSource name="Epicyclic Gearing" source={SOURCE_CODE}
                         jsxSource="https://github.com/timthesinner/react-vdom/blob/master/example/example-components/epicyclic-gearing.jsx"
                         originalSource="https://bl.ocks.org/mbostock/1353700"/>
      </div>
    );
  }
}
