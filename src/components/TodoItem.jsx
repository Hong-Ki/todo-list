import React, { Component } from 'react';
import * as styles from '../styles/todoItem.module.scss';
import classNames from 'classnames/bind';
import { HideButton } from '../components/Button';

import { MdEdit, MdDelete } from 'react-icons/md';
import { FiSquare, FiCheckSquare } from 'react-icons/fi';
console.log(styles);
const cx = classNames.bind(styles);
console.log(cx);
console.log(cx('header'));

class TodoItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      JSON.stringify(nextProps.todoItem.toJS()) !==
      JSON.stringify(this.props.todoItem.toJS())
    );
  }

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
            autoComplete={'off'}
          />
          <label htmlFor={todoItem.get('id')}>
            <FiSquare />
            <FiCheckSquare />
          </label>
        </div>
        <div
          className={cx(['item', todoItem.get('isComplete') ? 'complete' : ''])}
        >
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
