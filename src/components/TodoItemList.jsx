import React, { Component } from 'react';
import { withToastManager } from 'react-toast-notifications';
import TodoItem from '../components/TodoItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class TodoItemList extends Component {
  componentDidMount() {
    const { toastManager } = this.props;
    toastManager.add(
      '우선순위가 높은 순으로 정렬됩니다! 드래그해서 우선순위를 변경할 수 있어요!',
      {
        appearance: 'info',
        autoDismiss: true,
        pauseOnHover: true,
      },
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      JSON.stringify(nextProps.todoItems.toJS()) !==
      JSON.stringify(this.props.todoItems.toJS())
    );
  }

  render() {
    const {
      onChange,
      onRemove,
      onToggle,
      onDragEnd,
      todoItems,
      toastManager,
    } = this.props;

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
              toastManager={toastManager}
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
