import React, { Component, PropTypes } from 'react';

export default class PageNotFound extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  render() {
    return (
      <p>
        Page not found - the path, <code>{location.pathname}</code>,
        did not match any React Router routes.
      </p>
    );
  }
}
