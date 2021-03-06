import axios from 'axios';

export const registerAction = (email, password, name) => dispatch => {
  axios.post('http://localhost:3010/register', {email, password, name},{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }})
  .then(function (response) {
    localStorage.setItem('token', response.data.token);
    dispatch({ type: 'REGISTER_SUCCESS', payload: response.data })
  })
  .catch(function (error) { 
    dispatch({ type: 'REGISTER_ERROR', payload: error})
  });
}

