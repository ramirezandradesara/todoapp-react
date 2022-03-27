import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const  TodoContext = React.createContext();

function TodoProvider(props){ // va a envolver cualquier componente que pasemos por children

  /* ------------------------- VARIABLES ------------------------- */
  const { item: todos, saveItem: saveTodos, loading, error } = useLocalStorage('todos', []); // llamamos al custom hook

  /*   const [todos, saveTodos] = useLocalStorage('TODOS_V1', []) // usamos el hook, decimos donde guardar  */
  const [searchValue, setSearchValue] = React.useState(''); // van a ser utilizados en la funcion TodoSearch

  const completedTodos = todos.filter(todo => !!todo.completed).length; // cant de ToDos completados, referencia del todos del estado
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

  /*     const toggleCompleteTodos = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
        saveTodos   (newTodos);
      } 
   */

  /* ------------------------------ ELIMINAR TODO ----------------------------- */
  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);

    const newTodos = [...todos]; // copia de los ToDos

    newTodos.splice(todoIndex, 1); // borra el ToDo en el que estamos

    saveTodos(newTodos); // React hace el rerender
  };

//value son los valores que queremos compartir
    return (
        <TodoContext.Provider value={{
            error,
            loading,
            totalTodos,
            completedTodos,
            searchValue,// hacemos referencia a las consts de arriba ☝
            setSearchValue,
            searchedTodos,
            completeTodo,
            deleteTodo,
        }}> 
            {props.children} 
        </TodoContext.Provider>

    );
}

export { TodoProvider, TodoContext };

