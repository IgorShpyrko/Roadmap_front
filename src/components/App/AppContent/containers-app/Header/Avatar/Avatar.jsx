import React, { Component } from 'react';

import { connect } from 'react-redux';

import './Avatar.css';

import img from 'img/img.jpg';

class Avatar extends Component {
  state = {  }

  handleLogOut = () => {
    localStorage.clear();
    document.location.reload(true);
  }

  render() {
    const image = this.props.user && this.props.user.photo ? this.props.user.photo : img

    return (
      <div className='avatar-wrapper'>
        <div className='avatar'>
          <img className='avatar-img' src={image} alt='avatar'/>
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
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Avatar)