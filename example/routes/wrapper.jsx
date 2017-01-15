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

//Export a wrapper class that handles window re-size events
export default class ResizeWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions() {
    if (typeof window !== 'undefined') {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    const InjectedComponent = this.props.route.inject;
    return (
      <div className="center">
        <InjectedComponent {...this.props} {...this.state} />
      </div>
    );
  }
}
