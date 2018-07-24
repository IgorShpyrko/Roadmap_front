import axios from 'axios';


export const getUserList = () => dispatch => {
  console.log('getUserList')
  axios.get(`http://localhost:3010/skills/all_users`, {})
  .then(function (response) {
    console.log('response')
    dispatch({ type: 'SUCCES_GET_USER_LIST', payload: response.data });
  })
  .catch(function (error) {  
  });
}