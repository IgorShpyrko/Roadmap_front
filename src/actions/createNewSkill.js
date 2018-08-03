import axios from 'axios';

export const createNewSkill = (props) => dispatch => {
  const { title, categoryId, description } = props
  console.log(title);
  console.log(categoryId);
  console.log(description);

  // axios.post('http://localhost:3010/skills', {title, categoryId, description},{
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   }})
  // .then(function (response) {

  // })
  // .catch(function (error) {  
  // });
}

