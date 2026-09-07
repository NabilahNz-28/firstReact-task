import React from 'react';
import type { FilterType } from '../types';

interface FilterBarProps {
  filter: FilterType;
  onFilter: (f: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  onFilter,
  activeCount,
  completedCount,
  onClearCompleted,
}) => {
  const filters: FilterType[] = ['all', 'active', 'completed'];

  return (
    <div className="filter-bar">
      <span className="filter-bar__count">
        {activeCount} {activeCount === 1 ? 'task' : 'tasks'} left
      </span>
      <div className="filter-bar__tabs" role="group" aria-label="Filter tasks">
        {filters.map((f) => (
          <button
            key={f}
            id={`filter-${f}`}
            className={`filter-bar__tab${filter === f ? ' filter-bar__tab--active' : ''}`}
            onClick={() => onFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button
          id="clear-completed-btn"
          className="filter-bar__clear"
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      )}
    </div>
  );
};
