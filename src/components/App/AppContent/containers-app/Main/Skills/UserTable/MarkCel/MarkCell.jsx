import React, { Component } from 'react';

import applyImg from 'img/apply.png';

import './MarkCell.css';

export default class MarkCell extends Component {
  state = {  }

  handleBlur = (e) => {
    if(e.relatedTarget === null){
      this.onAbort();
      return;
    }
    if(e.relatedTarget.className !== 'mark-cell-apply-btn'){
      this.onAbort();
      return;
    }
    if(e.relatedTarget.className === 'mark-cell-apply-btn'){
      this.onApply()
    }
  }

  onApply = () => {
    this.props.handleChangeSkillMark({
      newMark: this.state.currentMark,
      skillId: this.props.skillId
    });
    this.setState({
      currentMark: '',
      isOpenedRangeEditMode: false
    });
  }

  onAbort = () => {
    this.setState({
      currentMark: '',
      isOpenedRangeEditMode: false
    });
    this.props.handleChangeSkillMark(null)
  }

  handleChangeMark = (e) => {
    this.setState({
      currentMark: e.target.value
    })
  }

  handleKeyDown = (e) => {
    if(e.keyCode === 27){
      this.onAbort();
    };
    if(e.keyCode === 13){
      this.onApply()
    }
  }
  
  render() {
    
    const { skillMark } = this.props;
    const { currentMark, isOpenedRangeEditMode } = this.state;

    return (
      isOpenedRangeEditMode ? 

      <td className='table-mark' >
        <div className='table-mark-container'>
          <span style={{width: '15px'}}>
          {
            currentMark ? 
            currentMark : 
            skillMark}
          </span>
          <input 
            autoFocus
            type="range" 
            name=""
            value={
              currentMark ? 
              currentMark : 
              skillMark
            }
            min="1" 
            max="10"
            onFocus={this.handleChangeMark}
            onChange={this.handleChangeMark}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleBlur}/>
            <button 
              className='mark-cell-apply-btn'
              onClick={this.onApply}>
            <img src={applyImg} alt=""/>
            </button>
          </div>
        </td> : 

        <td 
          className='table-mark' 
          onClick={
            () => {
              this.setState({
                isOpenedRangeEditMode: true
              })
            }
          }>
          {skillMark}
        </td>
    );
  }
}