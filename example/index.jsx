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

import Routes from './routes';

if (typeof window !== 'undefined') { //Client side
  render(
    <Router
      history={browserHistory}
      routes={Routes}
    />,
    document.getElementById('body')
  );

  if (module && module.hot) {
    module.hot.accept();
  }
}

module.exports = function render(props, callback) {
  const location = props.path.replace('.html', '');
  match({ routes: Routes, location: location }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.dir(error);
      throw error;
    } else if (redirectLocation) {
      console.dir(redirectLocation);
      throw redirectLocation;
    } else if (! renderProps) {
      console.error('Render properties was empty, bad route supplied.');
      throw `${location} is not mapped to a route`
    }

    console.log('Rendering', location);
    callback(null, props.template({
      ...props,
      content: renderToString(React.createElement(RouterContext, renderProps))
    }));
  });
}
