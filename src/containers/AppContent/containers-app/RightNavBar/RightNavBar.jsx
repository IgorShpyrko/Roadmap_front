import React, { Component } from 'react';

import './RightNavBar.css';

export default class RightNavBar extends Component {
  state = {  }
  render() {
    return (
      <div className={this.props.divClassName + ' ' + 'nav-container'}><span>RightNavBar</span></div>
    );
  }
}