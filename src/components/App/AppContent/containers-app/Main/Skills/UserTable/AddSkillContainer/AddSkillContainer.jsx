import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createNewSkill } from 'actions/createNewSkill';

import './AddSkillContainer.css';

class AddSkillContainer extends Component {
  state = { 
    inputValue: '',
    descriptionValue: '',
    warning: false
  }

  clearInputValue = () => {
    this.setState({
      inputValue: ''
    })
  }

  clearDescriptionValue = () => {
    this.setState({
      descriptionValue: ''
    })
  }

  handleAddSkill = () => {
    const { inputValue, descriptionValue } = this.state;
    const { choosedCategoryId } = this.props;
    
    if(inputValue === '') {
      this.setState({
        warning: true
      })
      return;
    }
    if(!choosedCategoryId) return;
    
    this.props.createNewSkill({
      title: inputValue,
      description: descriptionValue !== '' ? descriptionValue : 'no description',
      category_id: choosedCategoryId
    })

    this.clearInputValue();
    this.clearDescriptionValue();
  }

  handleChangeDescription = (e) => {
    this.setState({
      descriptionValue: e.target.value
    })
  }

  handleChangeInput = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  render() {
    const { choosedCategoryName } = this.props;
    const { warning } = this.state;
    return (
      <div className='add-skill-container'>
        <h3>Add New Skill in category '{choosedCategoryName}'</h3>
        <div className='add-skill-wrapper'>
          <div className='add-skill-component'>
            <label htmlFor='create-new-skill-name'><b>Skill Name:</b></label>
            {warning ? null :
              <span className='clearable-input'>
              <input 
                className='create-new-skill-input'
                name='create-new-skill-name' 
                type='text' 
                value={this.state.inputValue} 
                onChange={this.handleChangeInput}
              />
            <i className='create-new-skill-name-clear-icon' onClick={this.clearInputValue}>&times;</i>
            </span>
            }
            {warning ? 
              <div className='create-new-skill-warning'>
                <div className='create-new-skill-warning-text'>
                  You must enter Skill Name
                </div> 
                <div 
                  className='btn create-new-skill-warning-btn'
                  onClick={()=>{this.setState({warning: false})}}>
                    Ok
                </div>
              </div> :
              null
            }
          </div>
          <div className='add-skill-component'>
            <label htmlFor='create-new-skill-description'><b>Description:</b></label>
            <span className='clearable-input'>
              <textarea 
                className='create-new-skill-input textarea'
                name='create-new-skill-description' 
                type='text'
                value={this.state.descriptionValue}
                onChange={this.handleChangeDescription}
              />
              <i className='create-new-skill-name-clear-icon' onClick={this.clearDescriptionValue}>&times;</i>
            </span>
          </div>
          <button className='btn add-skill-btn' onClick={this.handleAddSkill}>Add skill</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return (
    state
  )
}

function mapDispatchToprops(dispatch) {
  return {
    createNewSkill: function (title, categoryId, description) {
      dispatch(createNewSkill( title, categoryId, description ));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToprops)(AddSkillContainer)