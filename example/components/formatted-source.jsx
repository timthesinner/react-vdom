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
  for (var line of source.trim().split('\n')) {
    if (line.includes('/*')) {
      comment = true;
    } else if (line.includes('*/')) {
      comment = false;
    } else if (!comment && !line.startsWith('var _') && !line.startsWith('function _')) {
      output.push(line);
    }
  }

  return '\n' + output.join('\n').replace(/\n(\s*\n){2,}/g, '\n\n') + '\n';
}


export default class FormatedSource extends Component {
  render() {
    const { jsxSource, originalSource, source, name } = this.props;
    if (!jsxSource || !originalSource || !name) {
      return <SyntaxHighlighter language='jsx' style={github}>{cleanSource(source)}</SyntaxHighlighter>
    }
    
    return (
      <div>
        <hr />
        <span>
          <h3 style={{display:'inline-block'}}>
            <a target="_blank" href={jsxSource}>A {name}</a>
          </h3>
          <span style={{color:'grey'}}>adopted from</span>
          <a target="_blank" href={originalSource}>original source</a>
        </span>
        <SyntaxHighlighter language='jsx' style={github}>{cleanSource(source)}</SyntaxHighlighter>
      </div>
    )
  }
}
