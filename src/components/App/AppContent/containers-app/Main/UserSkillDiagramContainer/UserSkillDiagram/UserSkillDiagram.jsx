import React, { Component } from 'react';

import { Treemap } from 'recharts';

const COLORS = ['#8889DD', '#9597E4', '#8DC77B', '#A5D297', '#E2CF45', '#F8C12D'];

class CustomizedContent extends Component{
  
  render() {
    const { root, depth, x, y, width, height, index, colors, title, mark } = this.props;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth < 2 ? colors[Math.floor(index / root.children.length * 6)] : 'none',
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {
          depth === 1 ?
          <text
            x={x + width / 1.7}
            y={y + height / 1.2}
            textAnchor="middle"
            fill="#fff"
            fontSize={14}
          >
            {title.length > 15 ? title.slice(0, 14): title}
          </text>
          : null
        }
        {
          depth === 1 ?
          <text
            x={x + 4}
            y={y + 18}
            fill="#fff"
            fontSize={14}
            fillOpacity={0.9}
          >
            {`mark: ${mark}`}
          </text>
          : null
        }
      </g>
    );
  }
};

class SimpleTreemap extends Component{

  filterSkillsByCategory = (skills) => {
    return skills.filter(skill => skill.categoryId === this.props.choosedCategoryId)
  }

   prepareData = (skills) => {
    let filteredSkills = skills.filter(skill => skill.skill !== null);
    let preparedSkills = filteredSkills.map((skill, idx) => {
      return {
        title: skill.skill.title,
        mark: skill.mark,
        categoryId: skill.skill.categoryId,
        children: []
      }
    })
    return preparedSkills
   }

	render () {

    const { skills, choosedCategoryId } = this.props;

    const preparedData = skills ? this.prepareData(skills) : null;
    const filteredByCategory = choosedCategoryId ? this.filterSkillsByCategory(preparedData) : null;

  	return (
      <Treemap
        width={1200}
        height={675}
        data={filteredByCategory}
        dataKey="mark"
        ratio={16/9}
        stroke="#fff"
        fill="#8884d8"
        content={<CustomizedContent colors={COLORS}/>}
      />
    );
  }
}

export default SimpleTreemap