import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../../../../../actions/getUserList'; 
import { getUserById } from '../../../../../../actions/getUserById';  
import UserTable from './UserTable/UserTable';
import UserList from '../../../../../../containers/UserList/UserList';

import './Skills.css';

class Skills extends Component {

  componentWillMount() {
    this.props.getUserList();
    if(this.props.user){
      this.props.getUserById(this.props.user.id);
    }
  };
  
  render() {

    const { listUsers, userById, isAdmin, user } = this.props;

    return (
      <div className='skills' >
        <h3 className='skills-title'>Skills</h3>
        <UserList listUsers={listUsers} /> 
        { 
          userById ? 
          <UserTable user={userById} /> :
          null 
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state)
  return { 
    listUsers: state.getUserList,
    userById: state.getUserById,
    isAdmin: state.auth.checkAdmin,
    user: state.auth.user
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getUserList: function () {
      dispatch(getUserList());
    },
    getUserById: function (id) {
      dispatch(getUserById(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Skills);

