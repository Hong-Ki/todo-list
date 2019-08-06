import React, { Component } from 'react';
import * as styles from '../styles/todoItem.module.scss';
import classNames from 'classnames/bind';
import { HideButton } from '../components/Button';

import { MdEdit, MdDelete } from 'react-icons/md';
import { FiSquare, FiCheckSquare } from 'react-icons/fi';
const cx = classNames.bind(styles);

class TodoItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      JSON.stringify(nextProps.todoItem.toJS()) !==
      JSON.stringify(this.props.todoItem.toJS())
    );
  }

  componentDidMount() {
    const { todoItem } = this.props;
    if (
      todoItem.get('endDate') !== '' &&
      !todoItem.get('isComplete') &&
      new Date() > new Date(todoItem.get('endDate') + ' 00:00:00')
    ) {
      this.addMessage(todoItem);
    }
  }

  componentDidUpdate(prevProps) {
    const { todoItem: prevTodoItem } = prevProps;
    const { todoItem } = this.props;
    if (prevTodoItem.get('isComplete') && !todoItem.get('isComplete')) {
      this.addMessage(todoItem);
    }

    if (!prevTodoItem.get('isComplete') && todoItem.get('isComplete')) {
      this.removeMessage(todoItem.get('id'));
    }
  }

  removeMessage = id => {
    const { toastManager } = this.props;
    toastManager.remove(id);
  };

  addMessage = item => {
    const { toastManager } = this.props;
    const message = `[${item.get('title')} : 
    ${item.get('contents')}]의 마감기한이 지났어요! 
    (~${item.get('endDate')})`;
    toastManager.add(message, {
      appearance: 'warning',
      id: item.get('id'),
      autoDismiss: false,
      pauseOnHover: false,
    });
  };

  onChange = () => {
    const { todoItem, onChange } = this.props;
    onChange(todoItem);
  };

  onRemove = () => {
    const { todoItem, onRemove } = this.props;
    onRemove(todoItem.get('id'));
  };

  handleCheck = e => {
    const { onToggle } = this.props;
    const { id } = e.target;

    onToggle(id);
  };

  render() {
    const { onChange, onRemove, handleCheck } = this;
    const { todoItem } = this.props;
    return (
      <li>
        <div className={cx('check')}>
          <input
            id={todoItem.get('id')}
            type={'checkbox'}
            onClick={handleCheck}
            defaultChecked={todoItem.get('isComplete')}
          />
          <label htmlFor={todoItem.get('id')}>
            <FiSquare />
            <FiCheckSquare />
          </label>
        </div>
        <div className={cx(['item', { complete: todoItem.get('isComplete') }])}>
          <div className={cx('header')}>
            <div className={cx('title')}>{todoItem.get('title')}</div>
            {todoItem.get('endDate') !== '' && (
              <div className={cx('endDate')}>~{todoItem.get('endDate')}</div>
            )}
          </div>
          <div className={cx('contents')}>{todoItem.get('contents')}</div>
        </div>
        <HideButton className={'hide-right'}>
          <MdEdit onClick={onChange} />
          <MdDelete onClick={onRemove} />
        </HideButton>
      </li>
    );
  }
}

export default TodoItem;
