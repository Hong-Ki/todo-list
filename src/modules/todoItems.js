import { List, Map, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import TodoItem from '../classes/TodoItem';

const CREATE = 'todoItem/CREATE';
const UPDATE = 'todoItem/UPDATE';
const REMOVE = 'todoItem/REMOVE';
const TOGGLE = 'todoItem/TOGGLE';

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

export const create = createAction(CREATE); // Map(todoItem:TodoItem)
export const update = createAction(UPDATE); // {id:string, todoItem:TodoItem}
export const remove = createAction(REMOVE); // id:string
export const toggle = createAction(TOGGLE); // id:string

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
        todoItem => todoItem.get('id') === action.payload.todoItem.id,
      );

      return state.set(findIndex, action.payload.todoItem.toImmutable);
    },
    [REMOVE]: (state, action) => {
      return state.delete(action.payload);
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
  },
  initalState,
);
