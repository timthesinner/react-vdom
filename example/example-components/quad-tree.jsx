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

//Adapted from http://bl.ocks.org/mbostock/4343214
export default class QuadTree extends Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
    this.nodes = this.nodes.bind(this);
  }

  static defaultProps = {
    height: 500,
    width: 960,
  }

  brushed(quadtree, point) {
    console.log('test')
    var extent = d3.event.selection;
    point.each(function(d) { d.scanned = d.selected = false; });
    this.search(quadtree, extent[0][0], extent[0][1], extent[1][0], extent[1][1]);
    point.classed("point--scanned", function(d) { return d.scanned; });
    point.classed("point--selected", function(d) { return d.selected; });
    console.log('done');
  }

  // Find the nodes within the specified rectangle.
  search(quadtree, x0, y0, x3, y3) {
    quadtree.visit(function(node, x1, y1, x2, y2) {
      if (!node.length) {
        do {
          var d = node.data;
          d.scanned = true;
          d.selected = (d[0] >= x0) && (d[0] < x3) && (d[1] >= y0) && (d[1] < y3);
        } while (node = node.next);
      }
      return x1 >= x3 || y1 >= y3 || x2 < x0 || y2 < y0;
    });
  }

  // Collapse the quadtree into an array of rectangles.
  nodes(quadtree) {
    var nodes = [];
    quadtree.visit(function(node, x0, y0, x1, y1) {
      node.x0 = x0, node.y0 = y0;
      node.x1 = x1, node.y1 = y1;
      nodes.push(node);
    });
    return nodes;
  }

  render() {
    const { defaultProps } = QuadTree;
    const { width, height } = this.props;
    const dom = new VirtualDOM('svg', {width:Math.min(+width, defaultProps.width), height:Math.min(+height, defaultProps.height), key: 'quad-tree', className:'quad-tree'});
    const svg = d3.select(dom);
    var _width = +svg.attr("width"),
        _height = +svg.attr("height"),
        selected;

    console.log('width', _width, 'height', _height)

    var random = Math.random,
        data = d3.range(2500).map(function() { return [random() * _width, random() * _height]; });

    var quadtree = d3.quadtree()
        .extent([[-1, -1], [_width + 1, _height + 1]])
        .addAll(data);

    svg.selectAll(".node")
      .data(this.nodes(quadtree))
      .enter().append("rect")
        .attr("class", "node")
        .attr("x", function(d) { return d.x0; })
        .attr("y", function(d) { return d.y0; })
        .attr("width", function(d) { return d.y1 - d.y0; })
        .attr("height", function(d) { return d.x1 - d.x0; });

    var point = svg.selectAll(".point")
      .data(data)
      .enter().append("circle")
        .attr("class", "point")
        .attr("cx", function(d) { return d[0]; })
        .attr("cy", function(d) { return d[1]; })
        .attr("r", 2);

    var brush = d3.brush().on("brush", this.brushed.bind(this, quadtree, point));
    console.log(brush);

    svg.append("g")
        .attr("class", "brush")
        .call(brush)
        .call(brush.move, [[100, 100], [200, 200]]);

    return dom.render();
  }
}
