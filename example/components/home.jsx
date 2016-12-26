import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  render() {
    const { childRoutes } = this.props.routes[0];
    return (
      <div>
        <h1>React VirtualDOM with D3 Charts</h1>
        <ul>
          {childRoutes.filter((c) => c.name).map((c) => {
            return <li key={c.path}><Link to={this.props.routes[0].build(c.path)}>{c.name}</Link></li>
          })}
        </ul>
      </div>
    )
  }
}
