import React, { Component } from 'react';
import Header from './components/Header';
import ModalContainer from './containers/ModalContainer';
import TodoListContainer from './containers/TodoListContainer';
import classNames from 'classnames/bind';
import * as styles from './styles/layout.module.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoItemsActions from './modules/todoItems';

const cx = classNames.bind(styles);

class App extends Component {
  componentDidMount() {
    const todoItems = localStorage.getItem('todoItems');
    if (todoItems !== null && typeof todoItems !== 'undefined') {
      const { TodoItemsActions } = this.props;
      TodoItemsActions.loadData(JSON.parse(todoItems));
    }
  }
  render() {
    return (
      <div className={cx('wrapper')}>
        <Header className={cx('header')}>Todo List</Header>
        <TodoListContainer className={cx('content')} />
        <ModalContainer />
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    TodoItemsActions: bindActionCreators(todoItemsActions, dispatch),
  }),
)(App);
