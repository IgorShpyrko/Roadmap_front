import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Welcome from '../Welcome/Welcome';
import UserSkillDiagram from './UserSkillDiagram/UserSkillDiagram';
import Skills from './Skills/Skills';
import Match from './Match/Match';


import './Main.css';

function First() {
  return (
    <div>
      DashBoard
    </div>
  )
}

export default class Main extends Component {

  render() {
    return (
      <div className={'main ' + this.props.mainClassName}>
        <Route exact path='/' component={Welcome}/>
        <Route path='/dashboard' component={First}/>
        <Route path='/diagram' component={UserSkillDiagram}/>
        <Route path='/skills' component={Skills}/>
        <Route path='/match' component={Match}/>
      </div>
    );
  }
}