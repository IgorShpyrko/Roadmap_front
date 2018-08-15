import React, { Component } from 'react';

import './LogTable.css';

export default class LogTable extends Component {
  state = {
    page: 1,
    visibleOnPage: 12,
    isSortedBy: 3
  }

  choosePage = (e) => {
    this.setState({
      page: e.target.innerHTML
    })
  }

  formatDate = (date) => {
    let newDate = new Date(Date.parse(date.toString()));
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return newDate.toLocaleDateString('ru', options);
  }

  sortLogFunction = (a, b) => {
    if(this.state.isSortedBy === 0){
      if (a.userSkill.skill.title > b.userSkill.skill.title) return 1;
      if (a.userSkill.skill.title < b.userSkill.skill.title) return -1;
    }
    if(this.state.isSortedBy === 1){
      if (a.skill_old < b.skill_old) return 1;
      if (a.skill_old > b.skill_old) return -1;
      if (a.skill_old === b.skill_old) {
        if (a.userSkill.skill.title > b.userSkill.skill.title) return 1;
        if (a.userSkill.skill.title < b.userSkill.skill.title) return -1;
      }
    }
    if(this.state.isSortedBy === 2){
      if (a.skill_new < b.skill_new) return 1;
      if (a.skill_new > b.skill_new) return -1;
      if (a.skill_new === b.skill_new) {
        if (a.userSkill.skill.title > b.userSkill.skill.title) return 1;
        if (a.userSkill.skill.title < b.userSkill.skill.title) return -1;
      }
    }
    if(this.state.isSortedBy === 3){
      if (a.updatedAt < b.updatedAt) return 1;
      if (a.updatedAt > b.updatedAt) return -1;
    }
  }

  render() {
    const { log } = this.props;
    const { page, visibleOnPage } = this.state;

    const pages = log ? Math.ceil(log.data.length / visibleOnPage) : null;

    let logNav = [];
    for(let i = 0; i < pages; i++){
      logNav.push(
        <button className={`btn ${page == (i + 1) ? 'active' : ''}`} key={i} onClick={this.choosePage}>{i+1}</button>
      )
    }
    
    // sorting log
    const logArray = log ? log.data.sort(this.sortLogFunction) : null;
    
    // how many logs are visible on a page
    const logArrayOnPage = (log && page) ? logArray.filter((log, idx) => {
      if(((page - 1) * visibleOnPage) <= idx){
        if(idx <= (page * visibleOnPage)){
          return log
        }
      }
    }) : null


    return (
      <React.Fragment>
        <div className='log-table-nav'>
          {logNav}
        </div>
        <table className='log-table'>
          <tbody className='log-table-body'>
            <tr className='log-table-row'>
              <th onClick={() => {if(this.state.isSortedBy === 0){return} this.setState({isSortedBy:0})}} className='log-table-header'>Skill Name</th>
              <th onClick={() => {if(this.state.isSortedBy === 1){return} this.setState({isSortedBy:1})}} className='log-table-header'>Prev Mark</th>
              <th onClick={() => {if(this.state.isSortedBy === 2){return} this.setState({isSortedBy:2})}} className='log-table-header'>New Mark</th>
              <th onClick={() => {if(this.state.isSortedBy === 3){return} this.setState({isSortedBy:3})}} className='log-table-header'>Update Date</th>
            </tr>
          {
            log && logArrayOnPage.map((item, idx) => {
              return (
                <tr key={idx} className='log-table-row'>
                  <td className='log-table-name-cell'>{item.userSkill.skill.title}</td>
                  <td className='log-table-cell'>{item.skill_old}</td>
                  <td className='log-table-cell'>{item.skill_new}</td>
                  <td className='log-table-cell'>{this.formatDate(item.updatedAt)}</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}