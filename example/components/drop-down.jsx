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

export default class DropDown extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.windowClick = this.windowClick.bind(this);

    this.state = { active: false };
  }

  componentDidMount () {
    window.addEventListener('click', this.windowClick);
    window.addEventListener('touchstart', this.windowClick);
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.windowClick);
    window.removeEventListener('touchstart', this.windowClick);
  }

  onClick(event) {
    event.preventDefault();
    this.setState({active: !this.state.active});
  }

  windowClick(event) {
    if (this.node && this.node !== event.target && !this.node.contains(event.target)) {
      this.setState({active:false});
    }
  }

  render() {
    const { children, label } = this.props;
    return (
      <li className="has-dropdown">
        <a ref={(node) => { this.node = node; }} onClick={this.onClick} style={{textAlign:'end'}}>{label}</a>
        <ul style={{display: this.state.active ? 'inherit' : 'none', position: 'fixed', opacity: 0.9}}>
          {children}
        </ul>
      </li>
    )
  }
}
