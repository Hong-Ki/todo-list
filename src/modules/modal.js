import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const SET_MODAL = 'modal/SET_MODAL';
const SET_MODE = 'modal/SET_MODE';

export const setModal = createAction(SET_MODAL); // {key:string, value:string}
export const setMode = createAction(SET_MODE); // {mode:string, modal:TodoItem}

const initialSate = Map({
  modal: Map({}),
  mode: '',
});

export default handleActions(
  {
    [SET_MODAL]: (state, action) => {
      return state.setIn(['modal', action.payload.key], action.payload.value);
    },
    [SET_MODE]: (state, action) => {
      if (
        action.payload.mode === 'create' ||
        action.payload.mode === 'change'
      ) {
        return state
          .set('mode', action.payload.mode)
          .set('modal', action.payload.modal);
      }

      return state.set('mode', action.payload.mode);
    },
  },
  initialSate,
);
