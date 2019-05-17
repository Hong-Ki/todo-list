import React, { Component } from 'react';
import { withToastManager } from 'react-toast-notifications';
import TodoItem from '../components/TodoItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class TodoItemList extends Component {
  componentDidMount() {
    const { todoItems, toastManager } = this.props;
    if (todoItems.size > 1) {
      toastManager.add(
        '우선순위가 높은 순으로 정렬되어 있어요! 드래그 해서 변경해보세요!',
        {
          appearance: 'info',
          autoDismiss: true,
          pauseOnHover: false,
        },
      );
    }

    const filterdItems = todoItems
      .filter(item => !item.get('isComplete') && item.get('endDate') !== '')
      .filter(item => new Date() > new Date(item.get('endDate') + ' 00:00:00'));

    for (let item of filterdItems) {
      const message = `[${item.get('title')} : 
        ${item.get('contents')}]의 마감기한이 지났어요! 
        (~${item.get('endDate')})`;
      toastManager.add(message, {
        appearance: 'warning',
        autoDismiss: false,
        pauseOnHover: false,
      });
    }
  }
  render() {
    const { onChange, onRemove, onToggle, onDragEnd, todoItems } = this.props;
    const itemList = todoItems.map(item => (
      <Draggable
        key={item.get('id')}
        draggableId={item.get('id')}
        index={item.get('priority')}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <TodoItem
              todoItem={item}
              onChange={onChange}
              onRemove={onRemove}
              onToggle={onToggle}
            />
          </div>
        )}
      </Draggable>
    ));
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todoList">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <ul>{itemList}</ul>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default (TodoItemList = withToastManager(TodoItemList));
