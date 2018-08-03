import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Welcome from '../Welcome/Welcome';
import DashBoard from './DashBoard/Dashboard';
import UserSkillDiagramContainer from './UserSkillDiagramContainer/UserSkillDiagramContainer';
import Skills from './Skills/Skills.jsx';
import Match from './Match/Match.jsx';


import './Main.css';

export default class Main extends Component {

  render() {
    return (
      <div className={'main ' + this.props.mainClassName}>
        <Route exact path='/' component={Welcome}/>
        <Route path='/dashboard' component={DashBoard}/>
        <Route path='/diagram' component={UserSkillDiagramContainer}/>
        <Route path='/skills' component={Skills}/>
        <Route path='/match' component={Match}/>
      </div>
    );
  }
}