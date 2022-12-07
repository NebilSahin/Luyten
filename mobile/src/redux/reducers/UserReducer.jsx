import {combineReducers} from 'redux';

const themeSelector = (state = {isDarkThemeActive: null}, action) => {
  switch (action.type) {
    case 'user/themeToggle':
      return {...state, isDarkThemeActive: action.payload};
    default:
      return state;
  }
};

const userSession = (state = {userToken: null, isActive: false}, action) => {
  switch (action.type) {
    case 'user/sessionUserToken':
      return {...state, userToken: !state.userToken};
    case 'user/sessionActiveState':
      return {...state, isActive: !state.isActive};
    default:
      return state;
  }
};

export default combineReducers({
  themeSelector,
  userSession,
});
