import React, { Component } from 'react';

import './LeftNavBar.css';

export default class LeftNavBar extends Component {
  render() {

    return (
      <div className={this.props.divClassName + ' ' + 'nav-container'}><span>LeftNavBar</span></div>
    );
  }
}