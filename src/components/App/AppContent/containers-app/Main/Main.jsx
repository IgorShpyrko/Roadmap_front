import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Welcome from '../Welcome/Welcome';
import LogBoard from './LogBoard/LogBoard';
import UserSkillDiagramContainer from './UserSkillDiagramContainer/UserSkillDiagramContainer';
import Skills from './Skills/Skills.jsx';
import Match from './Match/Match.jsx';


import './Main.css';

export default class Main extends Component {

  render() {
    return (
      <div className={'main ' + this.props.mainClassName}>
        <Switch>
          <Route exact path='/' component={Welcome}/>
          <Route path='/logboard' component={LogBoard}/>
          <Route path='/diagram' component={UserSkillDiagramContainer}/>
          <Route path='/skills' component={Skills}/>
          <Route path='/match' component={Match}/>
        </Switch>
      </div>
    );
  }
}