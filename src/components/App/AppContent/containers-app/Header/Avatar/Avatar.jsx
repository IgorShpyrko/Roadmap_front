import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';


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

  componentWillMount() {
    let user = jwt_decode(this.props.token);
    this.setState({
      user: user
    })
  }
  
  render() {
    const image = this.props.user && this.props.user.photo ? this.props.user.photo : img;
    const { isHoveredAvatar } = this.state;
    const { user } = this.props;

    return (
      <div className='avatar-wrapper'>
        <div className='avatar-user-name'>
          <span><b>{this.state.user.name}</b></span>
        </div>
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
    user: state.auth.user,
    token: state.auth.token
  }
}

export default connect(mapStateToProps)(Avatar)