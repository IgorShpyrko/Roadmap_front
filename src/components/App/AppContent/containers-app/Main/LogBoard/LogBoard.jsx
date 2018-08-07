import React, { Component } from 'react';

import { connect } from 'react-redux';

import { getUserLog } from 'actions/getUserLog';
import { getUserList } from 'actions/getUserList';
import LogTable from './LogTable/LogTable';
import UserList from 'containers/UserList/UserList';


class LogBoard extends Component {
  state = {  }

  componentDidMount() {
    if(this.props.user){
      this.props.getUserLog(this.props.user.id)
    }
    if(this.props.isAdmin){
      this.props.getUserList()
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.userById !== this.props.userById){
      if(nextProps.userById !== null){
        this.props.getUserLog(nextProps.userById.id)
      }
    }
    return true
  }

  render() {

  const { log, isAdmin, listUsers, userById } = this.props;

    return (
      <React.Fragment>
        <h3>DashBoard</h3>

        {/* if user */}
        {!isAdmin && (log ? <LogTable log={log} /> : <h4>ploading... please wait</h4>)}

        {/* if admin */}
        {isAdmin && (listUsers ? <UserList listUsers={listUsers}/> : <h4>ploading... please wait</h4>)}
        {isAdmin && (userById ? <LogTable log={log} /> : null)}

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