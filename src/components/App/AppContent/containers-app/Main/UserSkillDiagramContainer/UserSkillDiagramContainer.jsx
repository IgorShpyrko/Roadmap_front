import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUserList } from '../../../../../../actions/getUserList';
import { getSkillsCategories } from '../../../../../../actions/getSkillsCategories';
import UserList from '../../../../../../containers/UserList/UserList';

import UserSkillDiagram from './UserSkillDiagram/UserSkillDiagram';


class UserSkillDiagramContainer extends Component {
  state = { 
    data: [],
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
        <UserList listUsers={listUsers} />
        {skills !== null ? 
          <div className='user-table-nav'>
            {skillsCategories.map((category) => {
              return (
                <button
                  className='category-btn'
                  key={category.id} 
                  onClick={(e) => {this.handleChooseCategory(category.id, e)}}
                  style={{
                    margin: '5px'
                  }}>
                    {category.title}
                </button>
              )
            })}
          </div>: 
          null
        }
        { choosedCategoryId !== null ? 
          <UserSkillDiagram skills={skills} choosedCategoryId={choosedCategoryId} /> : 
          null
        } 
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return { 
    listUsers: state.getUserList,
    userById: state.getUserById,
    skillsCategories: state.getSkillsCategories
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getSkillsCategories: function () {
      dispatch(getSkillsCategories());
    },
    getUserList: function () {
      dispatch(getUserList());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSkillDiagramContainer)