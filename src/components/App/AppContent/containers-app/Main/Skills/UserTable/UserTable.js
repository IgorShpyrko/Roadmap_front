import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSkillsCategories } from 'actions/getSkillsCategories';
import { editSkillsMarkAction } from 'actions/skill' ;
import { editSkillsDispositionAction } from 'actions/skill' ;

import SkillNavBar from 'containers/SkillNavBar/SkillNavBar';

import TitleCell from './TitleCell/TitleCell';
import MarkCell from './MarkCel/MarkCell';
import DispositionCell from './DispositionCell/DispositionCell';
import CommentCell from './CommentCell/CommentCell';
import AddSkillContainer from './AddSkillContainer/AddSkillContainer';

import './UserTable.css';

class UserTable extends Component{
  constructor(props) {
    super(props);
    this.state = {
      choosedCategoryId: 1,
      choosedCategoryName: 'JavaScript',
      isActiveAddSkill: false,
      addSkillBtnText: 'Create New Skill'
    };
  }

  handleToggleAddSkillContainer = () => {
    this.setState((prevState) => {
      return {
        isActiveAddSkill: !prevState.isActiveAddSkill,
        addSkillBtnText: !prevState.isActiveAddSkill ? 'Close' : 'Create New Skill'
      }
    })
  }

  handleChangeSkillComment = (...props) => {
    if(props[0] === null){
      return
    };
    this.props.editSkillsDispositionAction(
      this.props.user.id,
      props[0].skillId,
      props[0].newComment
    );
  }

  handleChangeSkillDisposition = (...props) => {
    if(props[0] === null){
      return
    };
    this.props.editSkillsDispositionAction(
      this.props.user.id,
      props[0].skillId,
      props[0].newDisposition
    );
  }
  
  handleChangeSkillMark = (...props) => {
    if(props[0] === null){
      return
    };
    this.props.editSkillsMarkAction(
      this.props.user.id,
      props[0].skillId,
      props[0].newMark
    );
  }

  handleChooseCategory = (id, e) => {
    this.setState({
      choosedCategoryId: id,
      choosedCategoryName: e.target.innerHTML,
      isActiveAddSkill: false,
      addSkillBtnText: 'Create New Skill'
    });
  }

  componentWillMount() {
    this.props.getSkillsCategories();
  }

  render() {

    const { skillsCategories, user, isAdmin } = this.props;
    const { choosedCategoryName, choosedCategoryId } = this.state;

    let skills= [
      <tr key='header'>
        <th>Name</th>
        <th>Mark</th>
        <th>Aim</th>
        <th>Comments</th>
      </tr>
    ];

    user.userSkills.filter((skill) => {
      if(skill === null || skill.skill === null){
        return
      }
      // if is admin: 
      if( skill.skill.categoryId === choosedCategoryId){
        skills.push (
          <tr key={skill.id}>
            <TitleCell 
              skillTitle={skill.skill.title}
            />
            <MarkCell 
              skillId={skill.skillId} 
              skillMark={skill.mark} 
              handleChangeSkillMark={this.handleChangeSkillMark}
              isAdmin={isAdmin}
            />
            <DispositionCell 
              skillId={skill.skillId} 
              skillDisposition={skill.disposition} 
              handleChangeSkillDisposition={this.handleChangeSkillDisposition}
              isAdmin={isAdmin}
            />
            <CommentCell
              skillId={skill.skillId}
              skillComment={skill.comment}
              handleChangeSkillComment={this.handleChangeSkillComment}
              isAdmin={isAdmin}
            />
          </tr>
        )
      }
    })

    return (
      <div className="user-table-wrapper">
        {<SkillNavBar 
            categories={skillsCategories} 
            choosedCategoryId={choosedCategoryId}
            handleChooseCategory={this.handleChooseCategory}/>}
        {isAdmin ? 
          <div className='user-table-add-skill-btn-container'>
            <button className='btn user-table-add-skill-btn' onClick={this.handleToggleAddSkillContainer}>
              {this.state.addSkillBtnText}
            </button>
          </div> :
          null
        }
        {this.state.isActiveAddSkill ?
          <AddSkillContainer 
            choosedCategoryId={choosedCategoryId}
            choosedCategoryName={choosedCategoryName}
            user={user}/> :
          null
        }

        {skills.length > 1 ? 
          <table className='user-table'>
          <tbody>
            <tr>
              <th colSpan='4'>
                {this.state.choosedCategoryName}
              </th>
            </tr>
            {skills}
          </tbody>
        </table> : 
        null} 
      </div>
    );
  }
}
   
function mapStateToProps(state) {
    return { 
      skillsCategories: state.getSkillsCategories,
      isAdmin: state.auth.checkAdmin
    };
}

function mapDispathToProps(dispatch) {
    return {
      getSkillsCategories: function () {
        dispatch(getSkillsCategories());
      },
      editSkillsMarkAction: function (userId, skillId, mark) {
        dispatch(editSkillsMarkAction(userId, skillId, mark));
      },
      editSkillsDispositionAction: function (userId, skillId, disposition) {
        dispatch(editSkillsDispositionAction(userId, skillId, disposition));
      }
    }

}

export default connect(mapStateToProps,mapDispathToProps)(UserTable);
