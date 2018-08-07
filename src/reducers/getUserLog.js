let defaultState = null;

export function getUserLog(state = defaultState, action) {
  switch (action.type) {
    case 'SUCCES_GET_USER_LOG':
      return action.payload

    default:
      return state;
  }
}

