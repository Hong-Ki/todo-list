import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import classNames from 'classnames/bind';
import * as styles from '../styles/modal.module.scss';
import Button, { Submit } from '../components/Button';
import { MdClose } from 'react-icons/md';

const cx = classNames.bind(styles);

class TodoItemModal extends Component {
  onSubmit = e => {
    const { onClick } = this.props;
    e.preventDefault();
    onClick();
  };

  onChange = {
    title: e => {
      const { onChange } = this.props;
      const { value } = e.target;

      onChange.title(value);
    },
    contents: e => {
      const { onChange } = this.props;
      const { value } = e.target;

      onChange.contents(value);
    },
    endDate: (selectedDay, modifiers, dayPickerInput) => {
      const { onChange } = this.props;
      const { value } = dayPickerInput.input;

      if (value !== '') {
      }

      onChange.endDate(selectedDay);
    },
  };

  render() {
    const { onSubmit, onChange } = this;
    return (
      <div className={cx('wrapper')}>
        <div className={cx('box')}>
          <form onSubmit={onSubmit}>
            <div className={cx('header')}>
              TITLE
              <Button direction="right">
                <MdClose />
              </Button>
            </div>
            <div className={cx('contents')}>
              <input placeholder="제목*" onChange={onChange.title} required />
              <input
                placeholder="내용*"
                onChange={onChange.contents}
                required
              />
              <DayPickerInput
                placeholder={'종료 날짜(YYYY-M-D)'}
                dayPickerProps={{
                  disabledDays: {
                    before: new Date(),
                  },
                }}
                onDayChange={onChange.endDate}
              />
              <div className={cx('notice')}>
                <span>*은 필수로 입력해야 합니다.</span>
                <span>새 항목은 최상위 우선순위로 등록 됩니다.</span>
              </div>
            </div>
            <Submit>ADD</Submit>
          </form>
        </div>
      </div>
    );
  }
}

export default TodoItemModal;
