import React, { Component } from 'react';

import { Treemap } from 'recharts';

import './UserSkillDiagram.css';

const COLORS = ['rgb(200, 200, 200)', 'rgb(166, 166, 166)', 'rgb(133, 133, 133)', 'rgb(100, 100, 100)', 'rgb(66, 66, 66)', 'rgb(33, 33, 33)'];

class CustomizedContent extends Component{
  
  render() {
    const { root, depth, x, y, width, height, index, colors, title, mark, fontSize } = this.props;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: mark < 2 ? colors[0] : mark < 4 ? colors[1] : mark < 6 ? colors[2] : mark < 8 ? colors [3] : mark < 10 ? colors[4] : colors[5],
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
            fontSize={fontSize}
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
            fontSize={fontSize}
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
  state = {
    innerWidth: null
  }

  filterSkillsByCategory = (skills) => {
    return skills.filter(skill => skill.categoryId === this.props.choosedCategoryId)
  }

  onresize = () => {
    this.setState({
      innerWidth: window.innerWidth
    })
  }

  componentWillMount() {
    window.addEventListener('resize', this.onresize)
    this.setState({
      innerWidth: window.innerWidth
    })
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onresize)
    this.setState({
      innerWidth: null
    })
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
    let treemapWidth;
    let treemapFontSize;

    if(this.state.innerWidth > 1600){
      treemapWidth = 1200;
      treemapFontSize = 16;
    }

    if(this.state.innerWidth <= 1600 && this.state.innerWidth > 1250){
      treemapWidth = 900;
      treemapFontSize = 14;
    }
    if(this.state.innerWidth <= 1250 && this.state.innerWidth > 800){
      treemapWidth = 450;
      treemapFontSize = 11;
    }
    if(this.state.innerWidth <= 800) {
      treemapWidth = 250;
      treemapFontSize = 8;
    }

    const { skills, choosedCategoryId } = this.props;

    const preparedData = skills ? this.prepareData(skills) : null;
    const filteredByCategory = choosedCategoryId ? this.filterSkillsByCategory(preparedData) : null;


  	return (
      <Treemap
        className='treemap'
        width={treemapWidth}
        height={treemapWidth * 9 / 16}
        data={filteredByCategory}
        dataKey="mark"
        ratio={16/9}
        stroke="#fff"
        fill="#8884d8"
        content={<CustomizedContent colors={COLORS} fontSize={treemapFontSize}/>}
      />
    );
  }
}

export default SimpleTreemap