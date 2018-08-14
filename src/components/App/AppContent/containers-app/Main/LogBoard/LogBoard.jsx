import React, { Component } from 'react';
import { connect } from 'react-redux';

import LogTable from './LogTable/LogTable';
import UserList from 'containers/UserList/UserList';
import { getUserLog } from 'actions/getUserLog';
import { getUserList } from 'actions/getUserList';


class LogBoard extends Component {

  componentDidMount() {
    if(!this.props.isAdmin && this.props.user){
      this.props.getUserLog(this.props.user.id);
    }
    if(this.props.isAdmin){
      this.props.getUserList();
      if(this.props.userById){
        this.props.getUserLog(this.props.userById.id);
      }
    }
  }

  shouldComponentUpdate(nextProps){
      if(nextProps.userById !== this.props.userById){
        this.props.getUserLog(nextProps.userById.id);
        return true;
      }
      if(nextProps.log !== this.props.log){
        return true;
      }
      if(nextProps.listUsers !== this.props.listUsers){
        return true;
      }
    return false;
  }

  render() {

    const { log, isAdmin, listUsers, userById } = this.props;

    return (
      <React.Fragment>
        <h3 className='container-title'>Log Board</h3>
        {
          isAdmin && (listUsers ? 
            <UserList listUsers={listUsers}/> :
            <h4>ploading... please wait</h4>)
        }
        { log &&
          (log !== null ?
            <LogTable log={log} /> :
            null)
        }
      </React.Fragment>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.auth.user,
    log: state.getUserLog,
    isAdmin: state.auth.checkAdmin,
    listUsers: state.getUserList,
    userById: state.getUserById
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUserLog: function (id) {
      dispatch(getUserLog(id));
    },
    getUserList: function () {
      dispatch(getUserList());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogBoard)