import React, {Component} from 'react';
import { AutoComplete } from 'primereact/components/autocomplete/AutoComplete';

import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import './AutoCompleteSkillFilter.css';

export class AutoCompleteSkillFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      skills: null,
      filteredSkill: null
    };
  }

  clearFilter = () => {
    this.props.changeStateFilter([]); 
    this.setState({
      skills: null,
      filteredSkill: null
    })
  }

  filterSkillMultiple = (event) =>  {
    setTimeout(() => {
      let results = [];
        this.props.skillList['data'].filter((skill) => {
          if(!skill) return;
          if(skill.title.toLowerCase().includes(event.query.toLowerCase())){
            results.push({
              id: skill.id,
              name: skill.title
            })
          }
        });
        
      this.setState({ filteredSkill: results });
    }, 250);
  }

  render() {

    const { skills, filteredSkill } = this.state;

    return (
      <div className='autocomplete-skill-filter'>
        <h3>Skills</h3>
        <span className='ui-fluid'>
          <AutoComplete 
            value={skills} 
            suggestions={filteredSkill} 
            completeMethod={this.filterSkillMultiple}
            minLength={1} 
            placeholder='Skills'  
            field='name' 
            multiple={true} 
            onChange={(e) => {
              if(!e.value){this.clearFilter()}
              this.setState({skills: e.value});
              this.props.changeStateFilter(e.value);
            }} />
        </span>
        <button className='btn autocomplete-skill-filter-clear-btn' onClick={this.clearFilter}>Clear filters</button>
      </div>
    )
  }
}