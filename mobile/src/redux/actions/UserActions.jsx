
import {THEME_CONSTANT} from '../../shared/Constant';

export const themeToggleAction = (theme) => ({
  type: "user/themeToggle",
  payload: theme == THEME_CONSTANT.DARK
});