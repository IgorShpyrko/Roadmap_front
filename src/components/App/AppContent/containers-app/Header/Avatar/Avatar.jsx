import React, { Component } from 'react';

import { connect } from 'react-redux';

import './Avatar.css';

import img from 'img/img.jpg';

class Avatar extends Component {
  state = { 
    isHoveredAvatar: false
   }

   handleOnAvatarMouseLeave = () => {
    this.setState({
      isHoveredAvatar: false
    })
  }

  handleOnAvatarMouseEnter = () => {
    this.setState({
      isHoveredAvatar: true
    })
  }

  handleLogOut = () => {
    localStorage.clear();
    document.location.reload(true);
  }

  render() {
    const image = this.props.user && this.props.user.photo ? this.props.user.photo : img;
    const { isHoveredAvatar } = this.state;

    return (
      <div className='avatar-wrapper'>
        <div className='avatar' onMouseEnter={this.handleOnAvatarMouseEnter} onMouseLeave={this.handleOnAvatarMouseLeave}>
          <img className='avatar-img' src={image} alt='avatar'/>
        </div>
        {
          isHoveredAvatar ?
          <div className='avatar-big'>
            <img className='avatar-img-big' src={image} alt='avatar'/>
          </div> :
          null
        }
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