import { List } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const CREATE = 'todoItem/CREATE';
const UPDATE = 'todoItem/UPDATE';
const REMOVE = 'todoItem/REMOVE';
const TOGGLE = 'todoItem/TOGGLE';
const RELOAD = 'todoItem/RELOAD';

/**
 * TodoItem Class
 *  {
 *   id: string,
 *   endDate: string,
 *   title: string,
 *   contents: string,
 *   priority: number,
 *   isComplete : boolean,
 *  }
 **/

export const create = createAction(CREATE); // Map(todoItem:TodoItem:Immutable)
export const update = createAction(UPDATE); // {id:string, todoItem:TodoItem:Immutable}
export const remove = createAction(REMOVE); // id:string
export const toggle = createAction(TOGGLE); // id:string
export const reload = createAction(RELOAD); // List[TodoItem:Immutable]

const initalState = List([]);

export default handleActions(
  {
    [CREATE]: (state, action) => {
      return state
        .map(item => item.set('priority', item.get('priority') + 1))
        .unshift(action.payload);
    },
    [UPDATE]: (state, action) => {
      const findIndex = state.findIndex(
        todoItem => todoItem.get('id') === action.payload.todoItem.get('id'),
      );

      return state.mergeIn([findIndex], action.payload.todoItem);
    },
    [REMOVE]: (state, action) => {
      const findIndex = state.findIndex(
        todoItem => todoItem.get('id') === action.payload,
      );
      return state.delete(findIndex);
    },
    [TOGGLE]: (state, action) => {
      const findIndex = state.findIndex(
        todoItem => todoItem.get('id') === action.payload,
      );
      return state.setIn(
        [findIndex, 'isComplete'],
        !state.getIn([findIndex, 'isComplete']),
      );
    },
    [RELOAD]: (state, action) => {
      return action.payload;
    },
  },
  initalState,
);
