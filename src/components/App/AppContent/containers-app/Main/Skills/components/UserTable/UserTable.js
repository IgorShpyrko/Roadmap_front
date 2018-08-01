import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSkillsCategories } from '../../../../../../../../actions/getSkillsCategories' ;
import { editSkillsMarkAction } from '../../../../../../../../actions/skill' ;
import { editSkillsDispositionAction } from '../../../../../../../../actions/skill' ;

import TitleCell from './TitleCell/TitleCell';
import MarkCell from './MarkCel/MarkCell';
import DispositionCell from './DispositionCell/DispositionCell';
import CommentCell from './CommentCell/CommentCell';

import './UserTable.css'

class UserTable extends Component{
  constructor(props) {
    super(props);
    this.state = {
      choosedCategoryId: 1,
      choosedCategory: 'JavaScript'
    };
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
      choosedCategory: e.target.innerHTML
    });
  }

  componentWillMount() {
    this.props.getSkillsCategories();
  }

  render() {

    const { skillsCategories } = this.props;
    const userSkills = this.props.user.userSkills;
    const { choosedCategoryId } = this.state;

    let skills=[];

    userSkills.filter((skill) => {
      if(skill === null || skill.skill === null){
        return
      }
      if(skill.skill.categoryId === choosedCategoryId){
        skills.push (
          <tr key={skill.id}>
            <TitleCell 
              skillTitle={skill.skill.title} />

            <MarkCell 
              skillId={skill.skillId} 
              skillMark={skill.mark} 
              handleChangeSkillMark={this.handleChangeSkillMark}/>

            <DispositionCell 
              skillId={skill.skillId} 
              skillDisposition={skill.disposition} 
              handleChangeSkillDisposition={this.handleChangeSkillDisposition}/>

            <CommentCell
              skillId={skill.skillId}
              skillComment={skill.comment}
              handleChangeSkillComment={this.handleChangeSkillComment}/>
          </tr>
        )
      }
    })

    return (
      <div className="user-table-wrapper">
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
        <table className='user-table'>
          <tbody>
            <tr>
              <th colSpan='4'>
                {this.state.choosedCategory}
              </th>
            </tr>
            {skills.length === 0 ? null : 
              <tr>
                <th>Name</th>
                <th>Mark</th>
                <th>Disposition</th>
                <th>Comments</th>
              </tr>
            }
            {skills.length === 0 ? null : skills}
          </tbody>
        </table>
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
      editSkillsMarkAction: function (userId, skillId, mark) {
        dispatch(editSkillsMarkAction(userId, skillId, mark));
      },
      editSkillsDispositionAction: function (userId, skillId, disposition) {
        dispatch(editSkillsDispositionAction(userId, skillId, disposition));
      }
    }

}

export default connect(mapStateToProps,mapDispathToProps)(UserTable);
