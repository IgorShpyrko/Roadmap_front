import React from 'react';
import { connect } from 'react-redux';

import { AutoCompleteSkillFilter } from './containers/AutoCompleteSkillFilter/AutoCompleteSkillFilter';
import { MatchedUsers } from './containers/MatchedUsers/MatchedUsers';
import { getAllSkillsAction, getSkillList } from '../../../../../../actions/compare';
import { getMatchedUsers } from '../../../../../../actions/getMatchedUsers';
import { getUserList } from '../../../../../../actions/getUserList';
import UserList from '../../../../../../containers/UserList/UserList';
import SelectedUserSkills from './containers/SelectedUserSkills/SelectedUserSkills';

import './Match.css';

import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      filtersId: null,
      selectedUser: null
    }
  }

  selectUser = (user) => {
    this.setState({
      selectedUser: user
    })
  }

  changeStateFilter = (filters) => {
    const filterId = filters.map(item => {
      return item.id
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
    const { selectedUser } = this.state;

    return(
      <div className='compare-desk'>
        <UserList listUsers={listUsers} />
        <SelectedUserSkills filtersId={this.state.filtersId} user={this.props.userById}/>
        <hr/>
        <AutoCompleteSkillFilter skillList={skillList} changeStateFilter={this.changeStateFilter}/>
        <hr/>
        <MatchedUsers matchedUsers={matchedUsers} selectedUser={selectedUser}/>
      </div>
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