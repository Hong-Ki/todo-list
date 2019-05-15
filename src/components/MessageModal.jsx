import React from 'react';
import * as styles from '../styles/modal.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const Alert = ({ children, ...rest }) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('box')}>
        <div className={cx('header')}>HEADER</div>
        <div className={cx('contents')}>{children}</div>
      </div>
    </div>
  );
};
export const Confirm = ({ children, ...rest }) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('box')}>
        <div className={cx('header')}>HEADER</div>
        <div className={cx('contents')}>{children}</div>
      </div>
    </div>
  );
};
export const Toast = ({ children, ...rest }) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('box')}>
        <div className={cx('header')}>HEADER</div>
        <div className={cx('contents')}>{children}</div>
      </div>
    </div>
  );
};
