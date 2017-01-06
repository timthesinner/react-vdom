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

import Example from './example';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles';

export default class Home extends Component {
  render() {
    const { childRoutes } = this.props.routes[0];
    return (
      <div className="center">
        <h1>Seamless D3 and React</h1>
        <p>Transform your existing D3 charts (or make new ones) and take advantage of React's advanced DOM manipulatin and diff capabilitites.  Simply include the VirtualDOM class and pass that off to the D3.select and D3 will emit React nodes instead of document.createElement.</p>
        <hr />
        <div>
          <h3>Simple Example</h3>
          <p>
            Source for this example was adopted from
            <a target="_blank" href="https://bost.ocks.org/mike/circles/"> Three (4) Little Circles</a>
          </p>
        </div>
        <Example />
        <p>
          And the ES6 <a target="_blank" href="https://github.com/timthesinner/react-vdom/blob/master/example/components/example.jsx">source</a> for this example
        </p>
        <SyntaxHighlighter language='jsx' style={github}>{
`import React, { Component } from 'react';

import * as d3 from 'd3';
import VirtualDOM from 'react-virtual';

export default class SimpleExample extends Component {
  render() {
    //Initialize a new VirtualDOM tree with a root tag of svg and some default attributes
    const dom = new VirtualDOM('svg', {width:375, className:'center', style:{display:'block'}});

    d3.select(dom) //The magic happens here, from this point forward D3 is emitting React VirtualDOM
      .selectAll("circle").data([32, 57, 112, 293])
      .enter().append("circle")
        .style("fill", "steelblue")
        .attr("cy", 60)
        .attr("cx", (d, i) => i * 100 + 30)
        .attr("r", (d) => Math.sqrt(d));

    //Return the virtual dom as a React tree rooted at the 'tag' in this case svg.
    //React will diff this tree and update only nodes that need to be refreshed!
    return dom.render();
  }
}`}
        </SyntaxHighlighter>
      </div>
    )
  }
}
