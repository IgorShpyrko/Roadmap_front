import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'primereact/components/dropdown/Dropdown';


import { getUserById } from '../../actions/getUserById';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';

import './UserList.css'

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
    const { listUsers, userById, isAdmin, user } = this.props
    if(!isAdmin) {
      return (<h3>{user.name}</h3>)
    }
    return (
      <Dropdown 
      className='user-dropdown'
      value={this.state.user}
      options={listUsers} 
      onChange={this.onUserChange} 
      style={{width:'250px'}} 
      placeholder={userById ? userById.name : 'Select User'} 
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
