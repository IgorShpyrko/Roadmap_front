import React, { Component } from 'react';

import applyImg from 'img/apply.png';

import './DispositionCell.css';

export default class DispositionCell extends Component {
  state = {  }

  handleBlur = (e) => {
    if(e.relatedTarget === null){
      this.onAbort();
      return;
    }
    if(e.relatedTarget.className !== 'disposition-cell-apply-btn'){
      this.onAbort();
      return;
    }
    if(e.relatedTarget.className === 'disposition-cell-apply-btn'){
      this.onApply()
    }
  }

  onApply = () => {
    this.props.handleChangeSkillDisposition({
      newDisposition: this.state.currentDisposition,
      skillId: this.props.skillId
    });
    this.setState({
      currentDisposition: '',
      isOpenedRangeEditMode: false
    });
  }

  onAbort = () => {
    this.setState({
      currentDisposition: '',
      isOpenedRangeEditMode: false
    });
    this.props.handleChangeSkillDisposition(null)
  }

  handleChangeDisposition = (e) => {
    this.setState({
      currentDisposition: e.target.value
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

    const { skillDisposition, isAdmin } = this.props;
    const { currentDisposition, isOpenedRangeEditMode } = this.state;

    return (
      isOpenedRangeEditMode ? 

      <td className='table-disposition' >
        <div className='table-disposition-container'>
          <span style={{width: '15px'}}>
            {
              currentDisposition ? 
              currentDisposition : 
              skillDisposition
            }
          </span>
          <input 
            autoFocus
            type="range" 
            name=""
            value={
              currentDisposition ? 
              currentDisposition : 
              skillDisposition
            }
            min="1" 
            max="10" 
            onChange={this.handleChangeDisposition}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleBlur}/>
            <button 
              className='disposition-cell-apply-btn'
              onClick={this.onApply}>
            <img src={applyImg} alt=""/>
            </button>
          </div>
        </td> : 

        <td 
          className='table-disposition' 
          onClick={
            () => {
              if(!isAdmin){
                return
              }
              this.setState({
                isOpenedRangeEditMode: true
              })
            }
          }>
          {skillDisposition}
        </td>
    );
  }
}