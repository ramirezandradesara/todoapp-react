import React from 'react';
import { AppUI } from './AppUI';
/* const defaultTodos = [
  { text: 'Cortar cebolla', completed: true },
  { text: 'Tomar el cursso de intro a React', completed: false },
  { text: 'Llorar con la llorona', completed: true },
  { text: 'LALALALAA', completed: true },
]; */

function App() {

  /* ------------------------ ALMACENAR EN localStorage ----------------------- */

  const localStorageTodos = localStorage.getItem('TODOS_V1')
  let parsedTodos; // está todo los todos del localStorage

  if(!localStorageTodos){
    localStorage.setItem('TODOS_V1', JSON.stringify([]))
    parsedTodos = [];
  }else{
    parsedTodos = JSON.parse(localStorageTodos)// si hay todos en localStorage
  }

  // no guardamos solo en el estado local sino en localStorage
  const saveTodos = (newTodos) =>{
    const stringifiedTodos = JSON.stringify(newTodos)
    localStorage.setItem('TODOS_V1', stringifiedTodos)

    setTodos(newTodos) // actualiza desde React
  }

   /* ------------------------- Determinamos variables ------------------------- */

  const [todos, setTodos] = React.useState(parsedTodos)
  const [searchValue, setSearchValue] = React.useState(''); // van a ser utilizados en la funcion TodoSearch

  const completedTodos = todos.filter(todo => !!todo.completed).length; // cant de todos completados
  const totalTodos = todos.length // cant de ToDos en total creados


  /* --------------------- FILTRAR TODOS SEGÚN TODOSEARCH -------------------- */

  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos; // si los usuarios no escribieron en el search, aparecerán todos los todos
  } else {
    searchedTodos = todos.filter(todo => { // filtramos de la lista
      const todoText = todo.text.toLowerCase(); // la lista de ToDos
      const searchText = searchValue.toLowerCase(); // lo que escribieron los usuarios
      return todoText.includes(searchText) // si nuestro ToDos incluye lo que busco el usuario
    })
  }

  /* ------------------------- MARCAR COMO COMPLETADO ------------------------- */

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);

    const newTodos = [...todos]; // copia de los ToDos

    newTodos[todoIndex].completed = true; // no podemos acceder para cambiar el estado, React debe encargarse

    saveTodos(newTodos); // React hace el rerender

    /* todos[todoIndex] = { // 👈 lo comentado hace la misma funcion que lo de arriba
      text: todos[todoIndex].text,
      completed: true,
    } */
  }
  /* ---------------------------- TOGGLE COMPLETADO --------------------------- */

  /*   const toggleCompleteTodos = (text) => {
      const todoIndex = todos.findIndex(todo => todo.text === text);
      const newTodos = [...todos];
      newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
      setTodos(newTodos);
    } */


  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);

    const newTodos = [...todos]; // copia de los ToDos

    newTodos.splice(todoIndex, 1); // borra el ToDo en el que estamos

    saveTodos(newTodos); // React hace el rerender
  }

  return (

    <AppUI
      total={totalTodos}
      completed={completedTodos}
      searchValue={searchValue} // hacemos referencia a las consts de arriba ☝
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;
