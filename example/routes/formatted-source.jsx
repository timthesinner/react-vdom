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
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles';

function cleanSource(source) {
  const output = [];

  let comment = false;
  for (var line of source.split('\n')) {
    if (line.includes('/*')) {
      comment = true;
    } else if (line.includes('*/')) {
      comment = false;
    } else if (!comment && !line.startsWith('var _') && !line.startsWith('function _')) {
      output.push(line);
    }
  }

  return output.join('\n').replace(/\n(\s*\n){2,}/g, '\n\n');
}


export default class FormatedSource extends Component {
  render() {
    return (
      <div>
        <hr />
        <span>
          <h3 style={{display:'inline-block', marginRight:6}}>
            <a target="_blank" href={this.props.jsxSource}>A {this.props.name}</a>
          </h3>
          <span style={{color:'grey'}}>adopted from</span>
          <a target="_blank" href={this.props.originalSource}> original source</a>
        </span>
        <SyntaxHighlighter language='jsx' style={github}>{cleanSource(this.props.source)}</SyntaxHighlighter>
      </div>
    )
  }
}
