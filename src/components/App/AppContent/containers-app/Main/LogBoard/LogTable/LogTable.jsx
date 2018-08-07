import React, { Component } from 'react';

import './LogTable.css';

export default class LogTable extends Component {
  state = {  }

  formatDate = (date) => {
    let newDate = new Date(Date.parse(date.toString()));
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return newDate.toLocaleDateString('ru', options)
  }

  compare = (a, b) => {
    if (a.updatedAt < b.updatedAt) return 1;
    if (a.updatedAt > b.updatedAt) return -1;
  }

  render() {
    const { log } = this.props;

    const logArray = log ? log.data.sort(this.compare) : null
    return (
      <table className='log-table'>
        <tbody className='log-table-body'>
          <tr className='log-table-row'>
            <th className='log-table-header'>Skill Name</th>
            <th className='log-table-header'>Prev Mark</th>
            <th className='log-table-header'>New Mark</th>
            <th className='log-table-header'>Update Date</th>
          </tr>
        {
          log && logArray.map((item, idx) => {
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
    );
  }
}