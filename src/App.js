import React, { useState, useEffect } from 'react';
import './style.css';

const ToDoList = () => {
  

  const getData = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      return JSON.parse(localStorage.getItem("tasks"));
    }
    else{
      return []
    }
  }
  const [tasks, setTasks] = useState(getData());
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('asc');


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleCompleted = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };
  const handleClearAll = () =>{
    setTasks([]);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === '') {
      return true;
    }
    return task.text.toLowerCase().includes(filter.toLowerCase());
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort === 'asc') {
      return a.text.localeCompare(b.text);
    } else {
      return b.text.localeCompare(a.text);
    }
  });

  return (
    <div className="todo-list">
      <h1>My To-Do</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
        />
        <button type="submit">Add</button>
      </form>
      <div className="filters">
        <label>
          Filter:
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Search tasks"
          />
        </label>
        <label>
          Sort:
          <select value={sort} onChange={handleSortChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <ul>
        {sortedTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleCompleted(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.text}
            </span>
            <button type="Remove" onClick={() => handleRemoveTask(task.id)}>Remove</button>
          </li>
        ))}
        <div className="clear">
      <button type="Clear" onClick={handleClearAll}>Clear All</button>
      </div>
      </ul>
    </div>
  );
};

export default ToDoList;

