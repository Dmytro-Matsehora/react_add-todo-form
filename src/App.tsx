import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo, User } from './types';
import { TodoList } from './components/TodoList/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const visibleTodos = [...todos];

export const App = () => {
  const [title, setTitle] = useState('');
  const [option, setOption] = useState('0');

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="field">
          <label>
            <span className="inputTitle">Title: </span>

            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <label>
            <span className="inputTitle">User: </span>
            <select
              data-cy="userSelect"
              value={option}
              onChange={(event) => setOption(event.target.value)}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id}>{user.name}</option>
              ))}

            </select>
          </label>
          <span className="error">Please choose a user</span>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
