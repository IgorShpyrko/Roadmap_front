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

    return (
      <div>
        
      </div>
    );
  }
}