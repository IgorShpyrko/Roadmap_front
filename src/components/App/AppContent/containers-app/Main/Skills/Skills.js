import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../../../../../actions/getUserList'; 
import UserTable from './components/UserTable/UserTable';
import UserList from '../../../../../../containers/UserList/UserList';

import './Skills.css';

class Skills extends Component {

  componentWillMount() {
    this.props.getUserList(); 
  };

  render() {

    const { listUsers, userById } = this.props;
    return (
      <div className='skills' >
        <h3 className='skills-title'>Skills</h3>
        <UserList listUsers={listUsers} />   
        { 
          userById ? 
          <UserTable user={userById} />:
          null 
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    listUsers: state.getUserList,
    userById: state.getUserById
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getUserList: function () {
      dispatch(getUserList());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Skills);

