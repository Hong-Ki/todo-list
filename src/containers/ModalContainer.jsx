import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoItemsActions from '../modules/todoItems';
import * as todoItemModalActions from '../modules/modal';
import TodoItemModal from '../components/TodoItemModal';

class ModalContainer extends Component {
  handleCreate = () => {
    const { TodoItemsActions, TodoItemModalActions, modal } = this.props;
    TodoItemsActions.create(modal);
    TodoItemModalActions.setMode('');
  };

  handleChange = {
    title: title => {
      const { TodoItemModalActions } = this.props;
      TodoItemModalActions.setTitle(title);
    },
    contents: contents => {
      const { TodoItemModalActions } = this.props;
      TodoItemModalActions.setContents(contents);
    },
    endDate: date => {
      const { TodoItemModalActions } = this.props;
      TodoItemModalActions.setEndDate(date);
    },
  };

  render() {
    const { handleChange, handleCreate } = this;
    const { mode } = this.props;
    return (
      <div>
        {mode === 'create' && (
          <TodoItemModal onChange={handleChange} onClick={handleCreate} />
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    modal: state.modal.get('modal'),
    todoItems: state.todoItems,
    mode: state.modal.get('mode'),
  }),
  dispatch => ({
    TodoItemsActions: bindActionCreators(todoItemsActions, dispatch),
    TodoItemModalActions: bindActionCreators(todoItemModalActions, dispatch),
  }),
)(ModalContainer);
