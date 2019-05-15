import { Map, isImmutable } from 'immutable';
import shortid from 'shortid';

const defaultTodoItem = {
  id: '',
  endDate: null,
  title: '',
  contents: '',
  priority: 1,
  isComplete: false,
};

class TodoItem {
  constructor(todoItem = defaultTodoItem) {
    for (let key of Object.keys(defaultTodoItem)) {
      this[key] = todoItem[key] || defaultTodoItem[key];
    }

    if (this.id === '') {
      this.id = shortid.generate();
    }
  }

  toImmutable = () => {
    let result = Map();
    for (let key of Object.keys(this)) {
      if (typeof this[key] !== 'function') {
        result = result.set(key, this[key]);
      }
    }

    return result;
  };

  fromImmutable = todoItem => {
    if (!isImmutable(todoItem)) {
      return this;
    }

    const keys = todoItem.keys();
    for (let key of keys) {
      this[key] = todoItem.get(key) || defaultTodoItem[key];
    }
  };
}

export default TodoItem;
