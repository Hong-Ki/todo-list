import React from 'react';
import Header from './components/Header';
import ModalContainer from './containers/ModalContainer';
import TodoListContainer from './containers/TodoListContainer';
import BaseContainer from './containers/BaseContainer';
import classNames from 'classnames/bind';
import * as styles from './styles/layout.module.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoItemsActions from './modules/todoItems';

const cx = classNames.bind(styles);

function App() {
  return (
    <div className={cx('wrapper')}>
      <Header className={cx('header')}>Todo List</Header>
      <TodoListContainer className={cx('content')} />
      <ModalContainer />
      <BaseContainer />
    </div>
  );
}

export default connect(
  null,
  dispatch => ({
    TodoItemsActions: bindActionCreators(todoItemsActions, dispatch),
  }),
)(App);
