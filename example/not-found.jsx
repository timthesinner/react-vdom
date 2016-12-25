import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

export default class PageNotFound extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  render() {
    return (
      <p>
        Page not found - the path, <code>{location.pathname}</code>,
        did not match any React Router routes.
        <br />
        <Link to='/'>Head back home</Link>
      </p>
    );
  }
}
