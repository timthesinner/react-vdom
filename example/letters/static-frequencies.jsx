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

//Adapted from https://bl.ocks.org/mbostock/3885304
export default class StaticLetterFrequencies extends Component {
  static margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
  }

  letters() {
    const { route={}, letters } = this.props;
    return route.letters || letters;
  }

  render() {
    const dom = new VirtualDOM('svg', {width:'960', height:'500', key: 'letter-frequencies'});
    const svg = d3.select(dom);

    const width = +svg.attr("width") - StaticLetterFrequencies.margin.left - StaticLetterFrequencies.margin.right;
    const height = +svg.attr("height") - StaticLetterFrequencies.margin.top - StaticLetterFrequencies.margin.bottom;

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    const g = svg.append("g").attr("transform", `translate(${StaticLetterFrequencies.margin.left},${StaticLetterFrequencies.margin.top})`);

    const data = this.letters();
    x.domain(data.map(function(d) { return d.letter; }));
    y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10, "%"))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

    g.selectAll(".bar").data(data).enter().append("rect").attr("class", "bar").attr("x", (d) => {
      return x(d.letter);
    }).attr('key', (d) => {
      return d.letter;
    }).attr("y", (d) => {
      return y(d.frequency);
    }).attr("width", x.bandwidth()).attr("height", (d) => {
      return height - y(d.frequency);
    });

    return dom.render();
  }
}
