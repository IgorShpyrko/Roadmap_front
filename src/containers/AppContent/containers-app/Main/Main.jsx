import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Skills from '../../../Skills/Skills';
// import Match from '../../../Match/Match';


import './Main.css';

function First() {
  return (
    <div>
      First
    </div>
  )
}

function Second() {
  return (
    <div>
      Second
    </div>
  )
}

export default class Main extends Component {

  render() {
    return (
      <div className={'main ' + this.props.mainClassName}>
        <Route path='/first' component={First}/>
        <Route path='/second' component={Second}/>
        <Route path='/skills' component={Skills}/>
        {/* <Route path='/match' component={Match}/> */}
      </div>
    );
  }
}