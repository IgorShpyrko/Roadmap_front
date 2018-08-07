import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

import Avatar from './Avatar/Avatar'
import logo from 'img/logo.png';
import menuIcon from 'img/menu.svg';


export default class Header extends Component {
  state = {  }

  render() {
    return (
      <div className='header'>
        <div style={{display:'flex'}}>
          <NavLink to='/' className='logo-wrapper' >
            <img src={logo} alt="" width='40px'/>
            &nbsp;
            <span style={{marginBottom:'10px'}}>SmartIT</span>
          </NavLink>
          <div onClick={this.props.handleToggle}>
            <img className='menu-img'  src={menuIcon} alt='menuIcon' />
          </div>
        </div>
        <Avatar />
      </div>
    );
  }
  
}