import axios from 'axios';

axios.interceptors.request.use((config)=>{  
  const token = localStorage.token;
  config.headers.Authorization = `Bearer ${token}`;
  config.headers["Content-Type"] = `application/json`;
  return config;
});

axios.interceptors.response.use(
  function(response){
    return response
    },
  function (error){
    if (401 === error.response.status){  
      localStorage.token;
      window.location.reload();
    }
    return null
  } 
);

export const getSkillsAction = (id) => dispatch => {
  axios.get(`http://localhost:3010/skills/${localStorage.id}`, {})
  .then(function (response) {
    dispatch({ type: 'SUCCES_GET_SKILLS', payload: response.data });
  })
  .catch(function (error) {  
  });
}

export const getIdCategoriesAction = () => dispatch => {
  axios.get('http://localhost:3010/skills/categories', {})
  .then(function (response) {
    dispatch({ type: 'GET_ID_SKILLS', payload: response.data });
  })
  .catch(function (error) {  
  });
}

export const createSkillsAdminAction = (skill, id) => dispatch => {
  axios.post(`http://localhost:3010/skills?user_id=${id}`, skill)
  .then(function (response) {
    axios.get(`http://localhost:3010/skills?user_id=${id}`, {})
    .then(function (response) {
      dispatch({ type: 'SUCCES_GET_SKILLS', payload: response['data'] });
    })
  })
  .catch(function (error) {
  });
}

export const editSkillsMarkAction = (userId, skillId, mark) => dispatch => {
  axios.put('http://localhost:3010/skills', {userId, skillId, mark})
  .then(function (response) {
    dispatch({ type: 'GET_CHANGED_SKILLS', payload: response.data.user });
  })
  .catch(function (error) {
    console.error('editSkillsMarkAction', error);
  });
}

export const editSkillsDispositionAction = (userId, skillId, disposition) => dispatch => {
  axios.put('http://localhost:3010/skills', {userId, skillId, disposition})
  .then(function (response) {
    dispatch({ type: 'GET_CHANGED_SKILLS', payload: response.data.user });
  })
  .catch(function (error) {
    console.error('editSkillsDispositionAction', error);
  });
}

export const editSkillsCommentAction = (userId, skillId, comment) => dispatch => {
  axios.put('http://localhost:3010/skills', {userId, skillId, comment})
  .then(function (response) {
    dispatch({ type: 'GET_CHANGED_SKILLS', payload: response.data.user });
  })
  .catch(function (error) {
    console.error('editSkillsCommentAction',error);
  });
}

export const createSkillsAction = (skill) => dispatch => {
  axios.post('http://localhost:3010/skills', skill)
  .then(function (response) {
    axios.get(`http://localhost:3010/skills${localStorage.id}`, {})
    .then(function (response) {
      dispatch({ type: 'SUCCES_GET_SKILLS', payload: response['data'] });
    })
  })
  .catch(function (error) {
    console.error('createSkillsAction',error);
  });
}