import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSkillsCategories } from '../../../../actions/getSkillsCategories' ;
import { editSkillsAction } from '../../../../actions/skill' ;


import './UserTable.css'

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
// import 'font-awesome/css/font-awesome.css';


class UserTable extends Component{
  constructor(props) {
    super(props);
    this.state = {
      choosedCategoryId: 1,
      choosedCategory: 'JavaScript'
    };
  }

  handleKeyDown = (e) => {
    if(e.keyCode === 13){
      this.props.editSkillsAction(
        this.props.user.id,
        this.state.skillId,
        this.state.mark
      )
    }
  }

  handleChange = (skillId, e) => {
    this.setState({
      mark: e.target.value,
      skillId: skillId
    })
  }

  handleChooseCategory = (id, e) => {
    this.setState({
      choosedCategoryId: id,
      choosedCategory: e.target.innerHTML
    })
  }

  componentWillMount() {
    this.props.getSkillsCategories();
  }

  render() {
    const { skillsCategories } = this.props;
    
    const userSkills = this.props.user.userSkills
    let skills=[];
    userSkills.filter((skill) => {
      if(skill === null || skill.skill === null){
        return
      }
      if(skill.skill.categoryId === this.state.choosedCategoryId){
        skills.push (
          <tr key={skill.id}>
            <td className='table-title'>{skill.skill.title}</td>
            <td className='table-mark'>
              <input 
                className='table-mark-input'
                type="text" 
                size='1' 
                placeholder={skill.mark} 
                onChange={(e) => {this.handleChange(skill.skillId, e)}} 
                onKeyDown={this.handleKeyDown}/>
            </td>
            {skill.comment !== null ? 
            <td className='table-comment'>{skill.comment}</td> : 
            <td className='table-comment'>no comments</td>}
          </tr>
        )
      }
    })

    return (
      <div className="user-table-wrapper">
        <table className='user-table'>
          <tbody>
            <tr>
              <th colSpan='3'>
                {this.state.choosedCategory}
              </th>
            </tr>
            {skills.length === 0 ? null : 
              <tr>
                <th>Name</th>
                <th>Mark</th>
                <th>Comments</th>
              </tr>
            }
            {skills.length === 0 ? null : skills}
          </tbody>
        </table>
        <div className="user-table-nav">
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
        </div>
      </div>
    );
  }
}
    
   
function mapStateToProps(state) {
    return { 
      skillsCategories: state.getSkillsCategories
    };
}

function mapDispathToProps(dispatch) {
    return {
      getSkillsCategories: function () {
        dispatch(getSkillsCategories());
      },
      editSkillsAction: function (userId, skillId, mark) {
        dispatch(editSkillsAction(userId, skillId, mark));
      }
    }

}

export default connect(mapStateToProps,mapDispathToProps)(UserTable);
