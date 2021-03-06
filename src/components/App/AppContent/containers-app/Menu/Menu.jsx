import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Menu.css';

export default class Menu extends Component {

  render() {
    const { isAdmin } = this.props

    return (
      <React.Fragment>
      <div className={'nav-container ' + this.props.navClassName}>
        <div className='nav-header-wrapper'>
          <h4 className='nav-header'>Menu</h4>
          <div className='nav-header-close-icon' onClick={this.props.handleToggle}>
            <div className='nav-header-close-icon-div'></div>
            <div className='nav-header-close-icon-div'></div>
            <div className='nav-header-close-icon-div'></div>
          </div>
        </div>
        <ul className='nav-list'>
          <li className='nav-element'>
            <NavLink activeClassName='active' className='link_login' to='/logboard'>
              Log Board
            </NavLink>
          </li> 
          <li className='nav-element'>
            <NavLink activeClassName='active' className='link_login' to='/diagram'>
              Diagram
            </NavLink>
          </li>
          <li className='nav-element'>
            <NavLink activeClassName='active' className='link_login' to='/skills'>
              Skills
            </NavLink>
          </li>
          {
            isAdmin ? 
              <li className='nav-element'>
                <NavLink activeClassName='active' className='link_login' to='/match'>
                  Match
                </NavLink>
              </li> : 
              null
          }
        </ul>
        <div className='nav-footer'></div>
      </div>
      </React.Fragment>
    );
  }
}