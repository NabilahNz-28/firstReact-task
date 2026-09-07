import React from 'react';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoItem } from './components/TodoItem';
import { FilterBar } from './components/FilterBar';
import { useTodos } from './hooks/useTodos';
import './App.css';

const App: React.FC = () => {
  const {
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Task Board</h1>
        <p className="app__subtitle">Stay focused. Get things done.</p>
      </header>

      <main className="app__main">
        <AddTodoForm onAdd={addTodo} />

        {filteredTodos.length > 0 ? (
          <ul className="todo-list" role="list" aria-label="Todo list">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
          </ul>
        ) : (
          <div className="todo-empty">
            {filter === 'completed'
              ? 'No completed tasks yet.'
              : filter === 'active'
              ? 'All tasks are done. Great work!'
              : 'No tasks yet. Add one above.'}
          </div>
        )}

        <FilterBar
          filter={filter}
          onFilter={setFilter}
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={clearCompleted}
        />
      </main>
    </div>
  );
};

export default App;
