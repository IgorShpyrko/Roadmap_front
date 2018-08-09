import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUserById } from 'actions/getUserById';

import { Dropdown } from 'primereact/components/dropdown/Dropdown';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import './UserList.css';

class UserList extends Component {
  constructor() {
      super();
      this.state = {
        user: ''
      };
  }
    
  onUserChange = (e) => {
    this.setState({user: e.value});
    this.props.getUserById(e.value.id)
  }
    
  render() {
    const { listUsers, userById, isAdmin } = this.props;

    const filteredListUsers = listUsers ? listUsers.filter(user => user.role !== 1) : null;

    if(!isAdmin) {
      return null
    }
    return (
      <Dropdown 
        className='user-dropdown'
        value={this.state.user}
        options={filteredListUsers} 
        onChange={this.onUserChange} 
        style={{width:'250px'}} 
        placeholder={userById && userById.role !== 1 ? userById.name : 'Select User'} 
        optionLabel='name'
      />
    );
  }
}

function mapStateToProps(state) {
  return { 
    userById: state.getUserById,
    isAdmin: state.auth.checkAdmin,
    user: state.auth.user
  };
};

function mapDispathToProps(dispatch) {
  return {
    getUserById: function (id) {
      dispatch(getUserById(id));
    }
  };
}

export default connect(mapStateToProps,mapDispathToProps)(UserList);
