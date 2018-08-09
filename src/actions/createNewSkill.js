import axios from 'axios';

export const createNewSkill = (props) => dispatch => {
  const { title, category_id, description } = props

  axios.post('http://localhost:3010/skills', {title, category_id, description},{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }})
  .then(function (response) {

  })
  .catch(function (error) {  
  });
}

