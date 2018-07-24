import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Skills from '../../../../components/Skills/Skills';
import Match from '../../../../components/Match/Match';


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

function Third() {
  return (
    <div>
      Third
    </div>
  )
}

export default class Main extends Component {

  render() {
    return (
      <div className='main'>
        <Route path='/AppContent/first' component={First}/>
        <Route path='/AppContent/second' component={Second}/>
        <Route path='/AppContent/Skills' component={Skills}/>
        <Route path='/AppContent/Match' component={Match}/>
      </div>
    );
  }
}