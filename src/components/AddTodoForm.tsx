import React, { useState, useRef } from 'react';
import type { Priority } from '../types';

interface AddTodoFormProps {
  onAdd: (text: string, priority: Priority) => void;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(text, priority);
    setText('');
    inputRef.current?.focus();
  };

  return (
    <form id="add-todo-form" className="add-form" onSubmit={handleSubmit}>
      <input
        id="todo-input"
        ref={inputRef}
        className="add-form__input"
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
      />
      <select
        id="priority-select"
        className="add-form__select"
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        aria-label="Task priority"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        id="add-todo-btn"
        type="submit"
        className="add-form__btn"
        disabled={!text.trim()}
      >
        Add
      </button>
    </form>
  );
};
