let defaultState = {
    token: '',
    status: '',
    checkAdmin: false,
    MyID: null,
    user: null
};

export function auth(state = defaultState, action) {
    switch (action.type) {
        case 'CHECK_AUTH':
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                token: action.payload.token,
                MyID: action.payload.MyID,
                user: action.payload.user,
                status: 'success'};
        case 'LOGIN_ERROR': 
            return {...state, status: 'error'};
        case 'CHECK_ADMIN':
            return {...state, checkAdmin: action.payload};    
        default:
            return state;
    }
}

