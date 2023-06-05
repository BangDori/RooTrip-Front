import { createAction, handleActions } from 'redux-actions';

const CHANGE = 'MENU/CHANGE';

export const change = createAction(CHANGE);

const currentMenu = 'TRIP';

const menu = handleActions(
  {
    [CHANGE]: (state, { payload: clickedMenu }) => clickedMenu,
  },
  currentMenu,
);

export default menu;
