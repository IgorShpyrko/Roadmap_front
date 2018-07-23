import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../img/logo.png';

export default class Header extends Component {
  state = {  }
  render() {
    return (
      <div className='header' 
      style={{
        display: 'flex',
        'justify-content':'space-between',
        backgroundColor: '#EEE',
        padding: '10px',
        }}>
        <Link to='/' ><img src={logo} alt="" width='35px' /></Link>
        <span>Title</span>
        <span>Avatar</span>
      </div>
    );
  }
}