import React from 'react';
import * as styles from '../styles/todoItem.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const TodoItem = ({ ...rest }) => {
  const { todoItem } = rest;

  return (
    <div className={cx('item')}>
      {todoItem.get('title')}
      <br />
      {todoItem.get('contents')}
      <br />
      {todoItem.get('endDate')}
    </div>
  );
};

export default TodoItem;
