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
import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { Router, Route, IndexRoute, RouterContext, browserHistory, match } from 'react-router';

import App from './components/app';
import Home from './components/home';
import NotFound from './components/not-found';

import letterData from './data/letter-frequencies';
import Wrapper, { StaticLetterFrequenciesRoute, DynamicLetterFrequenciesRoute } from './routes';

const BasePath = ((window) => {
  const uri = window.__ROOT_PATH__ || '/';
  if (uri && uri[0] === '/') {
    return uri;
  }
  return '/' + uri
})(typeof window === 'undefined' ? {} : window);

const routes = (
  <Route path={BasePath} component={App} build={(route) => { return (BasePath === '/' ? BasePath + route : BasePath + '/' + route); }}>
    <IndexRoute component={Home} />

    <Route path="static-bar-chart" name='Static Bar Chart' letters={letterData} component={Wrapper} inject={StaticLetterFrequenciesRoute} />
    <Route path="dynamic-bar-chart" name='Dynamic Bar Chart' letters={letterData} component={Wrapper} inject={DynamicLetterFrequenciesRoute} />

    <Route path="*" component={NotFound} />
  </Route>
);

if (typeof window !== 'undefined') { //Client side
  render(
    <Router
      history={browserHistory}
      routes={routes}
    />,
    document.getElementById('body')
  );

  if (module && module.hot) {
    module.hot.accept();
  }
}

module.exports = function render(props, callback) {
  match({ routes, location: props.path.replace('.html', '') }, (error, redirectLocation, renderProps) => {
    callback(null, props.template({
      ...props,
      content: renderToString(React.createElement(RouterContext, renderProps))
    }));
  });
}
