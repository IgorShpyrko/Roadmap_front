import axios from 'axios';


export const getUserLog = (id) => dispatch => {
  axios.get(`http://localhost:3010/user/${id}/logs`, {})
  .then(function (response) {
    dispatch({ type: 'SUCCES_GET_USER_LOG', payload: response.data });
  })
  .catch(function (error) {  
  });
}