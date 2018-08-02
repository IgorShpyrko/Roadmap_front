import axios from 'axios';

export const createNewSkill = (title, categoryId, description) => dispatch => {
  axios.post('http://localhost:3010/skills', {title, categoryId, description},{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }})
  .then(function (response) {
    
  })
  .catch(function (error) {  
  });
}

