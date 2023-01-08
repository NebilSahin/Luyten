import {combineReducers} from 'redux';

//session teme
const sessionTheme = (state = {isDarkThemeActive: null}, action) => {
    switch (action.type) {
        case 'user/themeToggle':
            return {...state, isDarkThemeActive: action.payload};
        default:
            return state;
    }
};

//user session data
const sessionUser = (
    state = {accessToken: null, isActive: false, userLang: 'en', userProfile: {}},
    action,
) => {
    switch (action.type) {
        case 'user/sessionAccessToken':
            return {...state, accessToken: action.payload};
        case 'user/sessionLang':
            return {...state, userLang: action.payload};
        case 'user/sessionActiveState':
            return {...state, isActive: !state.isActive};
        case 'user/userProfile':
            return {...state, userProfile: action.payload};
        default:
            return state;
    }
};

export default combineReducers({
    sessionTheme,
    sessionUser,
});
