import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import logo from '../../../../img/logo.png';

export default class Header extends Component {
  state = {  }
  render() {
    return (
      <div className='header'>
        <Link to='/' >
          <img src={logo} alt="" width='35px' />
        </Link>
        <span>Title</span>
        <span>Avatar</span>
      </div>
    );
  }
}