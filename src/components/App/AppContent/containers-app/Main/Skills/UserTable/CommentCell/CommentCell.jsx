import React, { Component } from 'react';

import './CommentCell.css';

import applyImg from 'img/apply.png';

export default class CommentCell extends Component {
  state = { 
    inputValue: '',
    editMode: false
  }

  handleBlur = (e) => {
    if(e.relatedTarget){
      if(e.relatedTarget.className === 'comment-cell-apply-btn'){
        return
      }
    }
    this.clearInput();
    this.closeInput();
  }

  onApply = () => {
    this.props.handleChangeSkillComment({
      newComment: this.state.inputValue,
      skillId: this.props.skillId
    });
    this.clearInput();
    this.closeInput();
  }

  clearInput = () => {
    this.setState({
      inputValue: ''
    })
  }

  closeInput = () => {
    this.setState({
      editMode: false
    })
  }

  handleInputKeyDown = (e) => {
    if(e.keyCode === 27){
      this.clearInput();
      this.closeInput();
      return;
    };

    if(e.keyCode === 13){
      this.onApply();
    }
  }

  handleChangeInputValue = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleClick = () => {
    this.setState({
      editMode: true
    })
  }

  render() {
    const { skillComment } = this.props
    return (
      <td className='table-comment' onClick={this.handleClick}>
        <div className='table-comment-content'>
          {
            this.state.editMode ?
            <React.Fragment>
              <input
                autoFocus
                className='table-comment-input'
                type="text"
                value={this.state.inputValue}
                onChange={this.handleChangeInputValue}
                onKeyDown={this.handleInputKeyDown}
                onBlur={this.handleBlur}/>
                <button 
                  className='comment-cell-apply-btn'
                  onClick={this.onApply}>
                  <img src={applyImg} alt="" onClick={this.onApply}/>
                </button>
              </React.Fragment> :
          
            skillComment === null ? 
            <span>no comments</span> :
            <span>{skillComment}</span>
          }
        </div>
      </td> 
    )
  }
}