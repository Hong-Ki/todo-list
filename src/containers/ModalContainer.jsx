import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoItemsActions from '../modules/todoItems';
import * as todoItemModalActions from '../modules/modal';
import TodoItemModal from '../components/TodoItemModal';

class ModalContainer extends Component {
  handleSubmit = {
    create: () => {
      const { TodoItemsActions, modal } = this.props;

      TodoItemsActions.create(modal);
      this.handleHide();
    },
    change: () => {
      const { TodoItemsActions, modal } = this.props;

      TodoItemsActions.update({
        id: modal.get('id'),
        todoItem: modal,
      });
      this.handleHide();
    },
  };

  handleHide = () => {
    const { TodoItemModalActions } = this.props;
    TodoItemModalActions.setMode('');
  };

  handleChange = (key, value) => {
    const { TodoItemModalActions } = this.props;
    TodoItemModalActions.setModal({
      key: key,
      value: value,
    });
  };

  render() {
    const { handleChange, handleSubmit, handleHide } = this;
    const { mode, modal } = this.props;
    return (
      <div>
        {(mode === 'create' || mode === 'change') && (
          <TodoItemModal
            onChange={handleChange}
            onSubmit={handleSubmit[mode]}
            onHide={handleHide}
            modal={modal}
            mode={mode}
          />
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    modal: state.modal.get('modal'),
    mode: state.modal.get('mode'),
  }),
  dispatch => ({
    TodoItemsActions: bindActionCreators(todoItemsActions, dispatch),
    TodoItemModalActions: bindActionCreators(todoItemModalActions, dispatch),
  }),
)(ModalContainer);
