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

//Adapted from https://bl.ocks.org/mbostock/1353700
export default class EpicyclicGearing extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    var width = 960,
    height = 500,
    radius = 80,
    x = Math.sin(2 * Math.PI / 3),
    y = Math.cos(2 * Math.PI / 3);

    this.offset = 0;
    this.speed = 4;
    this.start = Date.now();

    const dom = new VirtualDOM('svg', { key: 'gearing'});
    var svg = d3.select(dom)
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(.55)")
      .append("g");

    var frame = svg.append("g")
        .datum({radius: Infinity});
    this.state = { dom: dom, svg: svg, frame: frame, annulus: false, planet: true, sun: false, reference: [radius * 5, Infinity, -radius] };

    frame.append("g")
        .attr("class", "annulus")
        .datum({teeth: 80, radius: -radius * 5, annulus: true})
      .append("path")
        .attr("d", gear);

    frame.append("g")
        .attr("class", "sun")
        .datum({teeth: 16, radius: radius})
      .append("path")
        .attr("d", gear);

    frame.append("g")
        .attr("class", "planet")
        .attr("transform", "translate(0,-" + radius * 3 + ")")
        .datum({teeth: 32, radius: -radius * 2})
      .append("path")
        .attr("d", gear);

    frame.append("g")
        .attr("class", "planet")
        .attr("transform", "translate(" + -radius * 3 * x + "," + -radius * 3 * y + ")")
        .datum({teeth: 32, radius: -radius * 2})
      .append("path")
        .attr("d", gear);

    frame.append("g")
        .attr("class", "planet")
        .attr("transform", "translate(" + radius * 3 * x + "," + -radius * 3 * y + ")")
        .datum({teeth: 32, radius: -radius * 2})
      .append("path")
        .attr("d", gear);

    function gear(d) {
      var n = d.teeth,
          r2 = Math.abs(d.radius),
          r0 = r2 - 8,
          r1 = r2 + 8,
          r3 = d.annulus ? (r3 = r0, r0 = r1, r1 = r3, r2 + 20) : 20,
          da = Math.PI / n,
          a0 = -Math.PI / 2 + (d.annulus ? Math.PI / n : 0),
          i = -1,
          path = ["M", r0 * Math.cos(a0), ",", r0 * Math.sin(a0)];
      while (++i < n) path.push(
          "A", r0, ",", r0, " 0 0,1 ", r0 * Math.cos(a0 += da), ",", r0 * Math.sin(a0),
          "L", r2 * Math.cos(a0), ",", r2 * Math.sin(a0),
          "L", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
          "A", r1, ",", r1, " 0 0,1 ", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
          "L", r2 * Math.cos(a0 += da / 3), ",", r2 * Math.sin(a0),
          "L", r0 * Math.cos(a0), ",", r0 * Math.sin(a0));
      path.push("M0,", -r3, "A", r3, ",", r3, " 0 0,0 0,", r3, "A", r3, ",", r3, " 0 0,0 0,", -r3, "Z");
      return path.join("");
    }

    this.timer = d3.timer(() => {
      var angle = (Date.now() - this.start) * this.speed,
          transform = function(d) {
            return "rotate(" + angle / d.radius + ")";
          };
      frame.selectAll("path").attr("transform", transform);
      frame.attr("transform", transform); // frame of reference
      this.setState({ angle: angle });
    });
  }

  componentWillUnmount() {
    this.timer.stop();
  }

  onClick(e) {
    e.preventDefault();

    const { frame, svg, reference } = this.state;
    var radius0 = frame.datum().radius, angle = (Date.now() - this.start) * this.speed;
    var radius1 = reference[e.target.dataset.idx];
    frame.datum({radius: radius1});
    svg.attr("transform", "rotate(" + (this.offset += angle / radius0 - angle / radius1) + ")");

    this.setState({annulus: false, planet: false, sun: false, [e.target.name]: true});
  }

  render() {
    return (<div className="gearing" style={{position:'relative'}}>
      <form onClick={this.onClick}>
        <input type="radio" name="annulus" id="ref-annulus" data-idx={0} checked={this.state.annulus}/>
        <label name="annulus" data-idx={0}>Annulus</label><br/>
        <input type="radio" name="planet" id="ref-planet" data-idx={1} checked={this.state.planet}/>
        <label name="planet" data-idx={1}>Planets</label><br/>
        <input type="radio" name="sun" id="ref-sun" data-idx={2} checked={this.state.sun}/>
        <label name="sun" data-idx={2}>Sun</label>
      </form>
      {this.state.dom.render()}
    </div>);
  }
}
