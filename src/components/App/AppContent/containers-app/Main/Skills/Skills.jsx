import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserList } from 'actions/getUserList'; 
import { getUserById } from 'actions/getUserById';  
import UserTable from './UserTable/UserTable';
import UserList from 'containers/UserList/UserList';

import './Skills.css';

class Skills extends Component {
  state = { }

  static getDerivedStateFromProps(props, state) {
    
    if(!props.listUsers){
      props.getUserList();
    }
    if(!props.userById){
      if(props.user && props.user.role !== 1){
        props.getUserById(props.user.id)
      }
    }
    return {
      ...state
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.changedSkills === this.props.changedSkills){
      return
    } else (
      this.props.getUserById(this.props.changedSkills.id)
    )
  }
  
  render() {
    console.log(this.props)

    const { listUsers, userById } = this.props;

    return (
      <div className='skills' >
        <h3 className='skills-title container-title'>Skills</h3>
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
  return { 
    listUsers: state.getUserList,
    userById: state.getUserById,
    isAdmin: state.auth.checkAdmin,
    user: state.auth.user,
    changedSkills: state.skill.changedSkills
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

