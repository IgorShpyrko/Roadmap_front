import { combineReducers } from 'redux';
import { auth } from './auth';
import { getSkillsList } from './getSkillsList';

export const rootReducer = combineReducers({
  auth,
  getSkillsList
});