import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Menu.css';

export default class Menu extends Component {

  render() {

    return (
      <React.Fragment>
      <div className={'nav-container ' + this.props.navClassName}>
        <h4 className='nav-header' onClick={this.props.handleToggle}>Menu</h4>
        <ul className='nav-list'>
          <li className='nav-element'>
            <NavLink className="link_login" to='/first'>
              first
            </NavLink>
          </li> 
          <li className='nav-element'>
            <NavLink className="link_login" to='/second'>
              second
            </NavLink>
          </li>
          <li className='nav-element'>
            <NavLink className="link_login" to='/skills'>
              Skills
            </NavLink>
          </li>
          <li className='nav-element'>
            <NavLink className="link_login" to='/match'>
              Match
            </NavLink>
          </li>
        </ul>
      </div>
      </React.Fragment>
    );
  }
}