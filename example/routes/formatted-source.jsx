
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
