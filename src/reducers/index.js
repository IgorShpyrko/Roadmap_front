import { combineReducers } from 'redux';
import { auth } from './auth';
import { getSkillsList } from './getSkillsList';
import { getUserById } from './getUserById';
import { getUserList } from './getUserList';
import { getSkillsCategories } from './getSkillsCategories';
import { getMatchedUsers } from './getMatchedUsers';
import { getUserLog } from './getUserLog';

export const rootReducer = combineReducers({
  auth,
  getSkillsList,
  getUserById,
  getUserList,
  getSkillsCategories,
  getMatchedUsers,
  getUserLog
});