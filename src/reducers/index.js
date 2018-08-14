import { combineReducers } from 'redux';
import { auth } from './auth';
import { skill } from './skill';
import { getSkillsList } from './getSkillsList';
import { getUserById } from './getUserById';
import { getUserList } from './getUserList';
import { getSkillsCategories } from './getSkillsCategories';
import { getMatchedUsers } from './getMatchedUsers';
import { getUserLog } from './getUserLog';
import { register } from './register';

export const rootReducer = combineReducers({
  auth,
  skill,
  getSkillsList,
  getUserById,
  getUserList,
  getSkillsCategories,
  getMatchedUsers,
  getUserLog,
  register
});