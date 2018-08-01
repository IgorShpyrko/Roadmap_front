import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUserList } from '../../../../../../actions/getUserList';
import { getSkillsCategories } from '../../../../../../actions/getSkillsCategories';
import UserList from '../../../../../../containers/UserList/UserList';

import { ResponsiveContainer, Treemap } from 'recharts';


class UserSkillDiagram extends Component {
  state = { 
    data: [
      { skill: 'Page A', mark: 4000 },
      { skill: 'Page B', mark: 3000 },
      { skill: 'Page C', mark: 2000 },
      { skill: 'Page D', mark: 2780 },
      { skill: 'Page E', mark: 2500 },
      { skill: 'Page F', mark: 1220 },
      { skill: 'Page G', mark: 2300 },
    ],
    skills: null,
    choosedCategoryId: null
   }

   handleChooseCategory = (id, e) => {
    this.setState({
      choosedCategoryId: id
    });
  }

  filterSkillsByCategory = (skills) => {
    return skills.filter(skill => skill.categoryId === this.state.choosedCategoryId)
  }

   prepareData = (skills) => {
    console.log(skills)
    let filteredSkills = skills.filter(skill => skill.skill !== null);
    let preparedSkills = filteredSkills.map((skill, idx) => {
      return {
        title: skill.skill.title,
        mark: skill.mark,
        categoryId: skill.skill.categoryId
      }
    })
    return preparedSkills
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
    const { data, skills, choosedCategoryId } = this.state;

    const preparedData = skills ? this.prepareData(skills) : null;
    const filteredByCategory = choosedCategoryId ? this.filterSkillsByCategory(preparedData) : null;
    console.log(preparedData);
    console.log(filteredByCategory)

    return (
      <React.Fragment>
        <UserList listUsers={listUsers} />
        {skills !== null ? <div className='user-table-nav'>
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
        null}
        { choosedCategoryId !== null ? 
        <ResponsiveContainer width={700} height="80%">
          <Treemap
            width={730}
            height={250}
            data={filteredByCategory}
            dataKey="size"
            ratio={4 / 3}
            stroke="#fff"
            fill="#8884d8"
          />
        </ResponsiveContainer> : 
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

export default connect(mapStateToProps, mapDispatchToProps)(UserSkillDiagram)