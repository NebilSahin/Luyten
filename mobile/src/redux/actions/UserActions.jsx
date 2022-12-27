
import {THEME_CONSTANT} from '../../shared/Constant';

export const themeToggleAction = (theme) => ({
  type: "user/themeToggle",
  payload: theme == THEME_CONSTANT.DARK
});

export const sessionAccessTokenAction = (accessToken) => ({
  type: "user/sessionAccessToken",
  payload: accessToken
});

export const sessionUserLangAction = (userLang) => ({
  type: "user/sessionLang",
  payload: userLang
});

export const sessionUserProfileAction = (userProfile) => ({
  type: "user/userProfile",
  payload: userProfile
});