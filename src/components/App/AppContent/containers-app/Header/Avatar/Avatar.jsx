import React, { Component } from 'react';

import { connect } from 'react-redux';

import './Avatar.css'

class Avatar extends Component {
  state = {  }
  render() {

    // console.log(this.props)
    return (
      <div>
        Avatar
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