import { combineReducers } from 'redux';
import { auth } from './auth';
import { getSkillsList } from './getSkillsList';
import { getUserById } from './getUserById';
import { getUserList } from './getUserList';

export const rootReducer = combineReducers({
  auth,
  getSkillsList,
  getUserById,
  getUserList
});