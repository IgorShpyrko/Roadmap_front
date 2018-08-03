import React, { Component } from 'react';

import { connect } from 'react-redux';

import './Avatar.css'

class Avatar extends Component {
  state = {  }

  handleLogOut = () => {
    localStorage.clear();
    document.location.reload(true);
  }

  render() {

    return (
      <div className='avatar-wrapper'>
        <div className='avatar'>
        Avatar
        </div>
        <div className='log-out' onClick={this.handleLogOut}>
          Log Out
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    ...state
  }
}

export default connect(mapStateToProps)(Avatar)