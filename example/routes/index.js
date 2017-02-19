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
import { Router, Route, IndexRoute } from 'react-router';

import App from '../components/app';
import Home from '../components/home';
import NotFound from '../components/not-found';

import letterData from '../data/letter-frequencies';

 //Export all appliance routable components
import { default as StaticLetterFrequenciesRoute } from '../routable-components/static-frequencies';
import { default as DynamicLetterFrequenciesRoute } from '../routable-components/dynamic-frequencies';
import { default as EpicyclicGearing } from '../routable-components/epicyclic-gearing';
//import { default as QuadTree } from '../example-components/quad-tree';
import ResizeWrapper from './wrapper';

const BasePath = ((window) => {
  const uri = window.__ROOT_PATH__ || '/';
  if (uri && uri[0] === '/') {
    return uri;
  }
  return '/' + uri
})(typeof window === 'undefined' ? {} : window);

//<Route path="quad-tree" name='Quadtree' component={QuadTree}/>

//Export appliance routes
const Routes = <Route path={BasePath} component={App} key={Math.random()} build={(route) => { return (BasePath === '/' ? BasePath + route : BasePath + '/' + route); }}>
  <IndexRoute component={Home} />

  <Route path="static-bar-chart" name='Static Bar Chart' letters={letterData} component={ResizeWrapper} inject={StaticLetterFrequenciesRoute} />
  <Route path="dynamic-bar-chart" name='Dynamic Bar Chart' letters={letterData} component={ResizeWrapper} inject={DynamicLetterFrequenciesRoute} />
  <Route path="epicyclic-gearing" name='EpicyclicGearing' component={ResizeWrapper} inject={EpicyclicGearing}/>

  <Route path="*" component={NotFound} />
</Route>;

export default Routes;
