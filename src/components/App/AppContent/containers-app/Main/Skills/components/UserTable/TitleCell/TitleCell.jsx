import React, { Component } from 'react';

import './TitleCell.css';

export default class TitleCell extends Component {
  state = {  }
  render() {
    const { skillTitle } = this.props
    return (
      <td className='table-title'>{skillTitle}</td>
    );
  }
}