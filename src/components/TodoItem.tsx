import React, { useState, useRef, useEffect } from 'react';
import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const PRIORITY_LABELS: Record<Todo['priority'], string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleEditSubmit = () => {
    onEdit(todo.id, editValue);
    setIsEditing(false);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleEditSubmit();
    if (e.key === 'Escape') {
      setEditValue(todo.text);
      setIsEditing(false);
    }
  };

  const handleDoubleClick = () => {
    if (!todo.completed) {
      setIsEditing(true);
    }
  };

  return (
    <li className={`todo-item${todo.completed ? ' todo-item--completed' : ''}`}>
      <button
        id={`toggle-${todo.id}`}
        className="todo-item__check"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
        aria-pressed={todo.completed}
      >
        <span className="todo-item__check-inner" />
      </button>

      <div className="todo-item__body">
        {isEditing ? (
          <input
            ref={inputRef}
            id={`edit-${todo.id}`}
            className="todo-item__edit-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleEditKeyDown}
          />
        ) : (
          <span
            className="todo-item__text"
            onDoubleClick={handleDoubleClick}
            title={todo.completed ? undefined : 'Double-click to edit'}
          >
            {todo.text}
          </span>
        )}
        <span
          className={`todo-item__priority todo-item__priority--${todo.priority}`}
        >
          {PRIORITY_LABELS[todo.priority]}
        </span>
      </div>

      <button
        id={`delete-${todo.id}`}
        className="todo-item__delete"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete task"
      >
        &times;
      </button>
    </li>
  );
};
