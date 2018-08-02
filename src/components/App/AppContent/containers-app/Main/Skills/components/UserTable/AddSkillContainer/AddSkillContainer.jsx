import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createNewSkill } from '../../../../../../../../../actions/createNewSkill';

import './AddSkillContainer.css';

class AddSkillContainer extends Component {
  state = { 
    inputValue: '',
    descriptionValue: ''
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
    
    if(inputValue === '') return;
    
    console.log(inputValue);
    console.log(descriptionValue);
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
    const { choosedCategoryName, user } = this.props;
    return (
      <div className='add-skill-container'>
        <h3>Add New Skill in '{choosedCategoryName}' category</h3>
        <div className='add-skill-wrapper'>
          <span className='add-skill-input'><b>user:</b> {user.name}</span>
          <div className='add-skill-component'>
            <label htmlFor='create-new-skill-name'><b>Skill Name</b></label>
              <span className='clearable-input'>
                <input 
                  name='create-new-skill-name' 
                  type='text' 
                  value={this.state.inputValue} 
                  onChange={this.handleChangeInput}
                />
              <i className='create-new-skill-name-clear-icon' onClick={this.clearInputValue}>&times;</i>
              </span>
          </div>
          <div className='add-skill-component'>
            <label htmlFor='create-new-skill-description'><b>Description:</b></label>
            <span className='clearable-input'>
              <textarea 
                name='create-new-skill-description' 
                type='text'
                value={this.state.descriptionValue}
                onChange={this.handleChangeDescription}
              />
              <i className='create-new-skill-name-clear-icon' onClick={this.clearDescriptionValue}>&times;</i>
            </span>
          </div>
          <button className='add-skill-btn' onClick={this.handleAddSkill}>Add skill</button>
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
    createNewSkill: function () {
      dispatch(createNewSkill({
        title: this.state.title,
        categoryId: this.props.categoryId,
        description: this.state.description
      }));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToprops)(AddSkillContainer)