import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSkillsCategories } from '../../../../actions/getSkillsCategories' ;


import './UserTable.css'

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
// import 'font-awesome/css/font-awesome.css';


class UserTable extends Component{
  constructor(props) {
    super(props);
    this.state = {
      choosedCategory: 'JavaScript'
    };
  }

  handleChooseCategory = (e) => {
    this.setState({
      choosedCategory: e.target.innerHTML
    })
  }

  componentWillMount() {
    this.props.getSkillsCategories();
  }

  render() {
    console.log(this.props);
    const { skillsCategories } = this.props;
    const userSkills = this.props.user.userSkills;
    let skills = [];
    return (
      <div className="user-table-wrapper">
        <table className='user-table'>
          <tbody>
            <tr>
              <th colSpan='3'>
                {this.state.choosedCategory}
              </th>
            </tr>
            {userSkills.filter((skill, idx) => {
              if(skill.skill === null){
                return
              }
              // return (
              //   <tr key={idx}>
              //     <td>ksjdb</td>
              //     {/* <td>{skill.skill.title}</td>
              //     <td>{skill.skill.mark}</td> */}
              //   </tr>
              // )
            })}
          </tbody>
        </table>
        <div className="user-table-nav">
          {skillsCategories.map((category) => {
            return (
              <button
                className='category-btn'
                key={category.id} 
                onClick={this.handleChooseCategory}
                style={{
                  margin: '5px'
                }}>
                  {category.title}
              </button>
            )
          })}
        </div>
      </div>
    );
  }
}
    
   
function mapStateToProps(state) {
    return { 
      skillsCategories: state.getSkillsCategories
    };
}

function mapDispathToProps(dispatch) {
    return {
      getSkillsCategories: function () {
        dispatch(getSkillsCategories());
      }
    }

}

export default connect(mapStateToProps,mapDispathToProps)(UserTable);
