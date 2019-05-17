import { combineReducers } from 'redux';

import todoItems from './todoItems';
import modal from './modal';

export default combineReducers({
  todoItems,
  modal,
});
