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
        {(() => {
          if (this.state.active) {
            return (
              <ul>
                {children}
              </ul>
            )
          }
        })()}
      </li>
    )
  }
}
