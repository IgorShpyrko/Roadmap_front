import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUserList } from 'actions/getUserList';
import { getSkillsCategories } from 'actions/getSkillsCategories';
import { getUserById } from 'actions/getUserById';
import UserList from 'containers/UserList/UserList';
import SkillNavBar from 'containers/SkillNavBar/SkillNavBar';

import UserSkillDiagram from './UserSkillDiagram/UserSkillDiagram';

import './UserSkillDiagramContainer.css';


class UserSkillDiagramContainer extends Component {
  state = { 
    skills: null,
    choosedCategoryId: null
   }

   handleChooseCategory = (id) => {
    this.setState({
      choosedCategoryId: id
    });
  }

  static getDerivedStateFromProps(props, state){

    if(props.listUsers === null){
      props.getUserList();
    };

    if(props.skillsCategories.length === 0){
      props.getSkillsCategories();
    };

    if(!props.userById && props.user && props.user.role === 0){
      props.getUserById(props.user.id)
    }
    
    if(props.userById !== null){
      return {
        ...state,
        skills: props.userById.userSkills
      }
    }

    return {
      ...state
    }
  }

  render() {
    const { listUsers, skillsCategories } = this.props;
    const { skills, choosedCategoryId } = this.state;

    return (
      <React.Fragment>
        <h3 className='container-title'>User Diagram</h3>
        <UserList listUsers={listUsers} />
        {skills !== null ? 
          <SkillNavBar 
            categories={skillsCategories} 
            choosedCategoryId={choosedCategoryId}
            handleChooseCategory={this.handleChooseCategory}/>: 
          null
        }
        { choosedCategoryId === null ? 
          null :
          <UserSkillDiagram skills={skills} choosedCategoryId={choosedCategoryId} />
        } 
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return { 
    listUsers: state.getUserList,
    userById: state.getUserById,
    skillsCategories: state.getSkillsCategories,
    user: state.auth.user
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getSkillsCategories: function () {
      dispatch(getSkillsCategories());
    },
    getUserList: function () {
      dispatch(getUserList());
    },
    getUserById: function (id) {
      dispatch(getUserById(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSkillDiagramContainer)