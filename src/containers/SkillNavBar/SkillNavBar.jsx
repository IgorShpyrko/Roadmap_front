import React, { Component } from 'react';

import './SkillNavBar.css';

export default class SkillNavBar extends Component {
  state = {  }
  render() {
    const { categories, choosedCategoryId, handleChooseCategory } = this.props
    return (
      <div className='user-table-nav'>
        {categories.map((category) => {
          return (
            <button
              className={`category-btn ${category.id === choosedCategoryId ? 'active' : ''}`}
              key={category.id} 
              onClick={(e) => {handleChooseCategory(category.id, e)}}
            >
              {category.title}
            </button>
          )
        })}
      </div>
    );
  }
}