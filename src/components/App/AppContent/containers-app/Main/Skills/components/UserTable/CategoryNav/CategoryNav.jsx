import React, { Component } from 'react';

export default class CategoryNav extends Component {
  state = {  }
  render() {
    const { skillsCategories } = this.props

    return (
      <div className="user-table-nav">
          {skillsCategories.map((category) => {
            return (
              <button
                className='category-btn'
                key={category.id} 
                onClick={(e) => {this.props.handleChooseCategory(category.id, e)}}
                style={{
                  margin: '5px'
                }}>
                  {category.title}
              </button>
            )
          })}
        </div>
    );
  }
}