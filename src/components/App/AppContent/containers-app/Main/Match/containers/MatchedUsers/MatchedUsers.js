import React, { Component } from 'react';

import { connect } from 'react-redux';


import User from './User/User';
import './MatchedUsers.css';

class MatchedUsers extends Component {
  
  render() {
    const { matchedUsers, selectedUser } = this.props;

    if (!matchedUsers || matchedUsers.length === 0) {
      return null 
    }


    
    return (
      <div className='matched-users'>
        {
          matchedUsers.map((user, idx) => <User key={idx} user={user} isSelected={selectedUser ? user.name === selectedUser.name : false}/>)
        }
      </div>
    )

  }
}

function mapStateToProps(state) {
  return {
    selectedUser: state.getUserById
  }
}

export default connect(mapStateToProps)(MatchedUsers)