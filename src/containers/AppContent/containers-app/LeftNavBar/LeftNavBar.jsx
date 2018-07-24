import React, { Component } from 'react';
import menuIcon from '../../../../img/menu.svg';
import { NavLink } from 'react-router-dom';

import './LeftNavBar.css';

export default class LeftNavBar extends Component {

  state = {
    navClassName: 'left-hidden-nav'
  };

  handleToggle = () => {
    let current = this.state.navClassName === 'left-visible-nav' ? 'left-hidden-nav' : 'left-visible-nav';
    this.setState({
      navClassName: current,
      
    })
  }

  render() {

    return (
      <div className={this.state.navClassName + ' ' + 'nav-container'}>
        <img className='logo' onClick={this.handleToggle} src={menuIcon} alt='menuIcon' width='40'/>
        <h4 className='nav-header'>LeftNavBar</h4>
        <ul className='nav-list'>
          <li className='nav-element'>
            <NavLink 
            className="link_login" 
            to='/AppContent/first'>
              first
            </NavLink>
          </li> 
          <li className='nav-element'>
            <NavLink 
            className="link_login" 
            to='/AppContent/second'>
              second
            </NavLink>
          </li>
          <li className='nav-element'>
            <NavLink 
            className="link_login" 
            to='/AppContent/Skill'>
              Skills
            </NavLink>
          </li>
          <li className='nav-element'>
            <NavLink 
            className="link_login" 
            to='/AppContent/Match'>
              Match
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}