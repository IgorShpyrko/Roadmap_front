import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSkillsCategories } from 'actions/getSkillsCategories';
import { editSkillsMarkAction } from 'actions/skill' ;
import { editSkillsDispositionAction } from 'actions/skill' ;
import { editSkillsCommentAction } from 'actions/skill' ;

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
      addSkillBtnText: 'Create New Skill',
      isSortedBy: 0
    };
  }

  sortSkills = (a, b) => {

    // sort by name
    if(this.state.isSortedBy === 0) {
      if(a.props.children[0].props.skillTitle < b.props.children[0].props.skillTitle) return -1;
      if(a.props.children[0].props.skillTitle > b.props.children[0].props.skillTitle) return 1;
    }
    // sort by Mark
    if(this.state.isSortedBy === 1) {
      if(+a.props.children[1].props.skillMark < +b.props.children[1].props.skillMark) return 1;
      if(+a.props.children[1].props.skillMark > +b.props.children[1].props.skillMark) return -1;
    }
    //sort by Aim
    if(this.state.isSortedBy === 2) {
      if(+a.props.children[2].props.skillDisposition < +b.props.children[2].props.skillDisposition) return 1;
      if(+a.props.children[2].props.skillDisposition > +(b.props.children[2].props.skillDisposition)) return -1;
    }
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
    this.props.editSkillsCommentAction(
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
      addSkillBtnText: 'Create New Skill',
      isSortedBy: 0
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
        <th onClick={() => {if(this.state.isSortedBy === 0){return} this.setState({isSortedBy:0})}}>Name</th>
        <th onClick={() => {if(this.state.isSortedBy === 1){return} this.setState({isSortedBy:1})}}>Mark</th>
        <th onClick={() => {if(this.state.isSortedBy === 2){return} this.setState({isSortedBy:2})}}>Aim</th>
        <th>Comments</th>
      </tr>
    ];

    user.userSkills.filter((skill) => {
      if(skill === null || skill.skill === null){
        return
      }
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
            />
            <DispositionCell 
              skillId={skill.skillId} 
              skillDisposition={skill.disposition} 
              handleChangeSkillDisposition={this.handleChangeSkillDisposition}
            />
            <CommentCell
              skillId={skill.skillId}
              skillComment={skill.comment}
              handleChangeSkillComment={this.handleChangeSkillComment}
            />
          </tr>
        )
      }
    })

    let sortedSkills = skills.sort(this.sortSkills)

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
            {sortedSkills}
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
      },
      editSkillsCommentAction: function (userId, skillId, comment) {
        dispatch(editSkillsCommentAction(userId, skillId, comment));
      }
    }

}

export default connect(mapStateToProps,mapDispathToProps)(UserTable);
