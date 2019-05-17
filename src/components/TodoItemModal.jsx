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
    const { onSubmit } = this.props;
    e.preventDefault();
    onSubmit();
  };

  onChange = {
    default: e => {
      const { onChange } = this.props;
      const { value, name } = e.target;
      onChange(name, value);
    },
    endDate: (selectedDay, modifiers, dayPickerInput) => {
      const { onChange } = this.props;
      const date = selectedDay.toISOString().slice(0, 10);
      const input = dayPickerInput.getInput();

      input.value = date;

      onChange('endDate', date);
    },
  };

  render() {
    const { onSubmit, onChange } = this;
    const { onHide, modal, mode } = this.props;

    return (
      <div className={cx('wrapper')}>
        <div className={cx('box')}>
          <form onSubmit={onSubmit}>
            <div className={cx('header')}>
              {mode === 'create' ? '등록' : '수정'}
              <Button
                className={['wrapper', 'right', 'close']}
                onClick={onHide}
              >
                <MdClose />
              </Button>
            </div>
            <div className={cx('contents')}>
              <input
                placeholder="제목*"
                name="title"
                defaultValue={modal.get('title')}
                onChange={onChange.default}
                required
              />
              <input
                name="contents"
                placeholder="내용*"
                defaultValue={modal.get('contents')}
                onChange={onChange.default}
                required
              />
              <DayPickerInput
                placeholder={'종료 날짜(YYYY-MM-DD)'}
                value={modal.get('endDate')}
                dayPickerProps={{
                  disabledDays: {
                    before: new Date(),
                  },
                }}
                inputProps={{
                  readOnly: 'readOnly',
                }}
                onDayChange={onChange.endDate}
              />
              <div className={cx('notice')}>
                <span>*가 있는 필드는 필수로 입력해야 합니다.</span>
                {mode === 'create' && (
                  <span>새 항목은 최상위 우선순위로 등록 됩니다.</span>
                )}
              </div>
            </div>
            <Submit>{mode === 'create' ? '등록' : '수정'}</Submit>
          </form>
        </div>
      </div>
    );
  }
}

export default TodoItemModal;
