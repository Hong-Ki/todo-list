import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoItemsActions from '../modules/todoItems';
import * as todoItemModalActions from '../modules/modal';
import { FloatingButton } from '../components/Button';
import { MdAdd } from 'react-icons/md';

class BaseContainer extends Component {
  onClick = () => {
    const { TodoItemModalActions } = this.props;
    TodoItemModalActions.setMode('create');
  };

  render() {
    const { onClick } = this;
    return (
      <div>
        <FloatingButton onClick={onClick}>
          <MdAdd />
        </FloatingButton>
      </div>
    );
  }
}

export default connect(
  state => ({
    modal: state.modal.get('modal'),
    todoItems: state.todoItems,
  }),
  dispatch => ({
    TodoItemsActions: bindActionCreators(todoItemsActions, dispatch),
    TodoItemModalActions: bindActionCreators(todoItemModalActions, dispatch),
  }),
)(BaseContainer);
