import React from 'react';
import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';
// import './App.css';

const defaultTodos = [
  { text: 'Cortar cebolla', completed: true },
  { text: 'Tomar el cursso de intro a React', completed: false },
  { text: 'Llorar con la llorona', completed: true },
  { text: 'LALALALAA', completed: false },
];

function App() {
  const [todos, setTodos] = React.useState(defaultTodos)
  const [searchValue, setSearchValue] = React.useState(''); // van a ser utilizados en la funcion TodoSearch
  const completedTodos = todos.filter(todo => !!todo.completed).length; // cant de todos completados
  const totalTodos = todos.length // cant de todos en total

 let searchedTodos = [];

  return (
    <React.Fragment>
      <TodoCounter 
        total={totalTodos}
        completed={completedTodos}
      />
      <TodoSearch 
        searchValue={searchValue} // hacemos referencia a las consts de arriba
        setSearchValue={setSearchValue}
      />

      <TodoList>
        {todos.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
          />
        ))}
      </TodoList>

      <CreateTodoButton />
    </React.Fragment>
  );
}

export default App;
