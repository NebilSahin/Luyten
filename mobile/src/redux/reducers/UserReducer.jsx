import {combineReducers} from 'redux';
const sessionTheme = (state = {isDarkThemeActive: null}, action) => {
    switch (action.type) {
        case 'user/themeToggle':
            return {...state, isDarkThemeActive: action.payload};
        default:
            return state;
    }
};

const sessionUser = (
    state = {userToken: null, isActive: false, userLang: 'en'},
    action,
) => {
    switch (action.type) {
        case 'user/sessionUserToken':
            return {...state, userToken: action.payload};
        case 'user/sessionLang':
            return {...state, userLang: action.payload};
        case 'user/sessionActiveState':
            return {...state, isActive: !state.isActive};
        default:
            return state;
    }
};

export default combineReducers({
    sessionTheme,
    sessionUser,
});
