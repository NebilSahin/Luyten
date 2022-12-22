
import {THEME_CONSTANT} from '../../shared/Constant';

export const themeToggleAction = (theme) => ({
  type: "user/themeToggle",
  payload: theme == THEME_CONSTANT.DARK
});

export const sessionAccessTokenAction = (sessionAccessToken) => ({
  type: "user/sessionUserToken",
  payload: sessionAccessToken
});

export const sessionUserLangAction = (sessionUserLang) => ({
  type: "user/sessionLang",
  payload: sessionUserLang
});
