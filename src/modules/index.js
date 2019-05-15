import { combineReducers } from 'redux';

import todoItems from './todoItems';
import modal from './modal';
import base from './base';

export default combineReducers({
  todoItems,
  modal,
  base,
});
