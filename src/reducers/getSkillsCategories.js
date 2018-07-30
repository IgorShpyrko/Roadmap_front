let defaultState = [];

export function getSkillsCategories(state = defaultState, action) {
  switch (action.type) {
    case 'SUCCES_GET_SKILLS_CATEGORIES':
      return action.payload
    default:
      return state;
  }
}

