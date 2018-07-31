import React, { Component } from 'react';

export default class SelectedUserSkills extends Component {
  state = {  }

  render() {

    if(!this.props.filtersId){
      return null
    }

    if(!this.props.user){
      return null
    }

    const { filtersId } = this.props;
    const userSkills = this.props.user.userSkills;

    // const filteredSkills = 

    console.log(filtersId);
    console.log(userSkills);

    return (
      <div>
        
      </div>
    );
  }
}