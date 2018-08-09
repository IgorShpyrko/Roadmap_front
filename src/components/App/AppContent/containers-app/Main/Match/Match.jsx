import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AutoCompleteSkillFilter } from './containers/AutoCompleteSkillFilter/AutoCompleteSkillFilter';
import MatchedUsers from './containers/MatchedUsers/MatchedUsers';
import { getAllSkillsAction, getSkillList } from 'actions/compare';
import { getMatchedUsers } from 'actions/getMatchedUsers';
import { getUserList } from 'actions/getUserList';
import UserList from 'containers/UserList/UserList';

import './Match.css';

import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      filtersId: null
    }
  }

  changeStateFilter = (filters) => {
    const filterId = filters.map(item => {
      return item.id;
    });
    this.setState({
      filtersId: filterId.length !== 0 ? filterId : null
    });

    this.props.getMatchedUsers(filterId);
  }
  
  componentWillMount() {
    this.props.getAllSkillsAction();
    this.props.getSkillList();
    this.props.getUserList();
  }

  render() {
    const { skillList, listUsers, matchedUsers } = this.props;

    return(
      <React.Fragment>
        <h3 className='container-title'>Find Pair</h3>
        <div className='compare-desk'>
          <UserList listUsers={listUsers} />
          <hr/>
          <AutoCompleteSkillFilter skillList={skillList} changeStateFilter={this.changeStateFilter}/>
          
          <MatchedUsers matchedUsers={matchedUsers}/>
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return{
    listUsers: state.getUserList,
    skillList: state.getSkillsList,
    matchedUsers: state.getMatchedUsers,
    userById: state.getUserById
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllSkillsAction: function () {
      dispatch(getAllSkillsAction());
    },
    getSkillList: function () {
      dispatch(getSkillList())
    },
    getMatchedUsers: function (filterId) {
      dispatch(getMatchedUsers(filterId))
    },
    getUserList: function () {
      dispatch(getUserList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)