import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const SET_TITLE = 'base/SET_VIEW';

export const setView = createAction(SET_TITLE);

const initalState = Map({});

export default handleActions(
  {
    [SET_TITLE]: (state, action) => {
      return state.setIn(['todoItem', 'title'], action.payload);
    },
  },
  initalState,
);
