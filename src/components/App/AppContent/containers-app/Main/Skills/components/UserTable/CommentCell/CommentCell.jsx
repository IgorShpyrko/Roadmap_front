import React, { Component } from 'react';

import './CommentCell.css';

export default class CommentCell extends Component {
  state = { 
    inputValue: '',
    editMode: false
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
      console.log('applying')
    }
  }

  handleChangeInputValue = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleClick = (e) => {
    this.setState({
      editMode: true
    })
  }

  render() {
    const { skillComment } = this.props
    return (
      <td className='table-comment' onClick={this.handleClick}>
        {
          this.state.editMode ?
          <input
            autoFocus
            className='table-comment-input'
            type="text"
            value={this.state.inputValue}
            onChange={this.handleChangeInputValue}
            onKeyDown={this.handleInputKeyDown}/> :
        
          skillComment === null ? 
          <span>no comments</span> :
          <span>{skillComment}</span>
        }
      </td> 
    )
  }
}