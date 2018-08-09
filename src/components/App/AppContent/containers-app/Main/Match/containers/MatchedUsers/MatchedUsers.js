import React, { Component } from 'react';
import { connect } from 'react-redux';

import User from './User/User';
import './MatchedUsers.css';

class MatchedUsers extends Component {
  
  render() {
    const { matchedUsers, selectedUser } = this.props;

    if(!selectedUser) {
      return null
    }

    if (!matchedUsers || matchedUsers.length === 0) {
      return null 
    }

    const sortedUsers = matchedUsers.sort(user => {
      if(user.name !== selectedUser.name){
        return 1
      }
      if(user.name === selectedUser.name){
        return -1
      }
    })

    return (
      <React.Fragment>
        <hr/>
        <div className='matched-users'>
          {sortedUsers.map((user, idx) =>
            <User key={idx} user={user} isSelected={selectedUser ?
              user.name === selectedUser.name :
              false}/>
          )}
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedUser: state.getUserById
  }
}

export default connect(mapStateToProps)(MatchedUsers)