import React, { Component } from 'react';

import './Welcome.css';

export default class Welcome extends Component {
  state = {  }
  render() {
    return (
      <div className='welcome-wrapper'>
        <div className='welcome-container'>
          <h2 className='welcome-header'>Welcome</h2>
          <p className='welcome-paragraph'>You`re on SmartIt RoadMap site.</p>
          <p className='welcome-paragraph'>Feel free to search for all the necessary information.</p>
          <p className='welcome-paragraph'>Have a nice day!!!</p>
        </div>
      </div>
    );
  }
}