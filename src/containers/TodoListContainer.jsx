import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoItemsActions from '../modules/todoItems';
import * as todoItemModalActions from '../modules/modal';
import { ToastProvider } from 'react-toast-notifications';
import TodoItemList from '../components/TodoItemList';
import { FloatingButton } from '../components/Button';
import { MdAdd } from 'react-icons/md';
import TodoItem from '../classes/TodoItem';

class TodoListContainer extends Component {
  onChange = todoItem => {
    const { TodoItemModalActions } = this.props;
    TodoItemModalActions.setMode({
      mode: 'change',
      modal: todoItem,
    });
  };

  onCreate = () => {
    const { TodoItemModalActions } = this.props;
    TodoItemModalActions.setMode({
      mode: 'create',
      modal: new TodoItem().toImmutable(),
    });
  };

  onRemove = id => {
    const { TodoItemsActions } = this.props;
    TodoItemsActions.remove(id);
  };

  onToggle = id => {
    const { TodoItemsActions } = this.props;
    TodoItemsActions.toggle(id);
  };

  onDragEnd = result => {
    const { todoItems, TodoItemsActions } = this.props;
    const findIndex = todoItems.findIndex(
      item => item.get('id') === result.draggableId,
    );
    const deletedList = todoItems.delete(findIndex);
    let idx = 0;
    TodoItemsActions.reload(
      deletedList
        .insert(result.destination.index, todoItems.get(findIndex))
        .map(item =>
          item.set(
            'priority',
            item.get('isComplete') ? item.get('priority') : idx++,
          ),
        ),
    );
  };

  render() {
    const { className, todoItems } = this.props;
    const { onChange, onRemove, onToggle, onDragEnd, onCreate } = this;

    return (
      <div className={className}>
        <ToastProvider>
          <TodoItemList
            todoItems={todoItems}
            onChange={onChange}
            onRemove={onRemove}
            onToggle={onToggle}
            onDragEnd={onDragEnd}
          />
        </ToastProvider>
        <FloatingButton onClick={onCreate}>
          <MdAdd />
        </FloatingButton>
      </div>
    );
  }
}

export default connect(
  state => ({
    todoItems: state.todoItems,
  }),
  dispatch => ({
    TodoItemsActions: bindActionCreators(todoItemsActions, dispatch),
    TodoItemModalActions: bindActionCreators(todoItemModalActions, dispatch),
  }),
)(TodoListContainer);
