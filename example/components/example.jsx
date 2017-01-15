//Copyright (c) 2016 TimTheSinner All Rights Reserved.
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

import * as d3 from 'd3';
import VirtualDOM from '../../src';

export default class SimpleExample extends Component {
  render() {
    //Initialize a new VirtualDOM tree with a root tag of svg and some direct attributes
    const dom = new VirtualDOM('svg', {width:375, className:'center', style:{display:'block'}});

    d3.select(dom) //The magic happens here, D3 is emitting React Nodes instead of Elements
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
}
