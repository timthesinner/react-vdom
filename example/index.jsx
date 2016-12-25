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
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import NotFound from './not-found';

import letterData from './data/letter-frequencies';
import StaticLetterFrequencies from './letters/static-frequencies';
import DynamicLetterFrequencies from './letters/dynamic-frequencies';

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

class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

class Home extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        LA LA CONNECT THE DOTS
      </div>
    )
  }
}

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />

    <Route path="static-bar-chart" letters={letterData} component={StaticLetterFrequencies} />
    <Route path="dynamic-bar-chart" letters={letterData} component={DynamicLetterFrequencies} />

    <Route path="*" component={NotFound} />
  </Route>
);


render(
  <Router
    history={browserHistory}
    routes={routes}
  />,
  document.getElementById('body')
);

if (module.hot) {
  module.hot.accept();
}
