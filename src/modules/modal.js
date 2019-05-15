import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import TodoItem from '../classes/TodoItem';

const SET_TITLE = 'modal/SET_TITLE';
const SET_CONTENTS = 'modal/SET_CONTENTS';
const SET_END_DATE = 'modal/SET_END_DATE';
const SET_PRIORITY = 'modal/SET_PRIORITY';
const SET_MODE = 'modal/SET_MODE';
const TOGGLE_VIEW = 'modal/TOGGLE_VIEW';

export const setTitle = createAction(SET_TITLE);
export const setContents = createAction(SET_CONTENTS);
export const setEndDate = createAction(SET_END_DATE);
export const setPriority = createAction(SET_PRIORITY);
export const setMode = createAction(SET_MODE);
export const toggleView = createAction(TOGGLE_VIEW);

const initalState = Map({
  modal: Map({}),
  mode: '',
});

export default handleActions(
  {
    [SET_TITLE]: (state, action) => {
      return state.setIn(['modal', 'title'], action.payload);
    },
    [SET_CONTENTS]: (state, action) => {
      return state.setIn(['modal', 'contents'], action.payload);
    },
    [SET_END_DATE]: (state, action) => {
      return state.setIn(['modal', 'endDate'], action.payload);
    },
    [SET_PRIORITY]: (state, action) => {
      return state.setIn(['modal', 'priority'], action.payload);
    },
    [SET_MODE]: (state, action) => {
      if (state.get('mode') !== action.payload) {
        state = state.set('modal', new TodoItem().toImmutable());
      }
      return state.set('mode', action.payload);
    },
    [TOGGLE_VIEW]: (state, action) => {
      return state.set('modal', new TodoItem().toImmutable());
    },
  },
  initalState,
);
