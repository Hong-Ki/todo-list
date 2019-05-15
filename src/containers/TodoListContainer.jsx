import React, { Component } from 'react';
import TodoItem from '../components/TodoItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoItemsActions from '../modules/todoItems';

class TodoListContainer extends Component {
  render() {
    const { className, todoItems } = this.props;
    debugger;
    const itemList = todoItems.map(item => (
      <li key={item.get('id')}>
        <TodoItem todoItem={item} />
      </li>
    ));

    return (
      <div className={className}>
        <ul>{itemList}</ul>
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
  }),
)(TodoListContainer);
