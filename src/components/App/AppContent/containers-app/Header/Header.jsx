import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

import Avatar from './Avatar/Avatar'
import logo from 'img/logo.png';


export default class Header extends Component {
  state = {  }

  render() {
    return (
      <div className='header'>
        <div style={{display:'flex'}}>
          <NavLink to='/' className='logo-link' >
            <img src={logo} alt='' width='40px'/>
            &nbsp;
            <span className='logo-link-span'>SmartIT</span>
          </NavLink>
        </div>
        <Avatar />
      </div>
    );
  }
  
}