import React from 'react';
import * as styles from '../styles/button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Button = ({ children, ...rest }) => {
  return (
    <div className={cx(rest.className)} onClick={rest.onClick}>
      {children}
    </div>
  );
};

export const Submit = ({ children, ...rest }) => {
  return (
    <div className={cx('submit')}>
      <input type="submit" value={children} onClick={rest.onClick} />
    </div>
  );
};

export const FloatingButton = ({ children, ...rest }) => {
  return (
    <div className={cx(['floating', 'circle'])} onClick={rest.onClick}>
      {children}
    </div>
  );
};

export const HideButton = ({ children, ...rest }) => {
  return <div className={cx(rest.className)}>{children}</div>;
};

export default Button;
