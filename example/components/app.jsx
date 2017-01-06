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
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import DropDown from './drop-down';

export default class App extends Component {
  render() {
    const { childRoutes } = this.props.routes[0];
    const baseRoute = this.props.routes[0].build('');
    return (
      <div className='large-12 columns'>
        <div className="contain-to-grid sticky">
          <nav className="top-bar" role="navigation">
            <ul className="title-area">
              <li className="name"><h1><a target="_blank" href="https://github.com/timthesinner/react-vdom">React VirtualDOM</a></h1></li>
            </ul>

            <section className="top-bar-section">
              <ul className="right">
                <DropDown label='Example Charts'>
                  {childRoutes.filter((c) => c.name).map((c) => {
                    return <li key={c.path} style={{float:'none'}}><Link to={this.props.routes[0].build(c.path)}>{c.name}</Link></li>
                  })}
                </DropDown>
              </ul>

              <ul className="left">
                <li><Link to={baseRoute}>Home</Link></li>
              </ul>
            </section>
          </nav>
        </div>

        {this.props.children}
      </div>
    );
  }
}
