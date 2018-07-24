import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../actions/getUserList'; 
import UserTable from './components/UserTable/UserTable';
import SkillList from './components/SkillList/SkillList';


class Skills extends Component {

  componentWillMount() {
    this.props.getUserList(); 
  };

  render() {
    const {listUsers} = this.props;
    return (
      <div className="general" >
        <SkillList listUsers={listUsers} />   
        { 
          this.props.userById ? 
            <UserTable user={this.props.userById} /> :
            null 
        
        /*
        заменить userSkill на userById!!!!!!!!!!!!!!!!!!
        */
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

