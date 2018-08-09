import React, { Component } from 'react';

import './User.css';

export default class User extends Component {
  state = { 
    markSum: 0
  }

  shouldComponentUpdate(nextProps) {
      let sum = 0;

      nextProps.user.userSkills.map(item => {
        sum += item.mark;
        return null
      })
      if(sum !== this.state.markSum){
        this.setState({
          markSum: sum
        })
        return true;
      } 
      return true;
  }

  componentWillMount() {
    this.setState({
      markSum: this.props.user.userSkills[0].mark
    })
  }

  render() {
    
    const { user, isSelected } = this.props;
    const { markSum } = this.state;

    const wrapperClassName = isSelected ? 'matched-user selected-user' : 'matched-user';

    return (
      <div className={wrapperClassName}>
        <div className='matched-user-name'>
          <h4>{user.name}</h4>
        </div>
        <div>
          <h4>Mark sum: {markSum}</h4>
        </div>
        <div className='matched-user-skills'>
          {user.userSkills.map((skill, idx) => {
            return (
              <React.Fragment key={idx}>
                <div className='matched-user-skill'>
                  Skill: {skill.skill.title} mark: {skill.mark}
                </div>
              </React.Fragment>
            )
          })}
        </div>
      </div>
    );
  }
}