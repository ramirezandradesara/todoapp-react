import React from 'react';
import { AppUI } from './AppUI';
/* const defaultTodos = [
  { text: 'Cortar cebolla', completed: true },
  { text: 'Tomar el cursso de intro a React', completed: false },
  { text: 'Llorar con la llorona', completed: true },
  { text: 'LALALALAA', completed: true },
]; */


/* ------------------------ ALMACENAR EN localStorage ----------------------- */
function useLocalStorage(itemName, initialValue) { // custom hook, avisa a react que debe hacer un nuevo render
  const [error, setError] = React.useState(false); // estado de carga
  const [loading, setLoading] = React.useState(true); // estado de carga
  const [item, setItem] = React.useState(initialValue) // guardamos en el estado

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName); // traemos el elemento del parametro

        let parsedItem; // está todo los todos del localStorage

        if (!localStorageItem) { // sino hay nada en localStorage, lo creamos. Si hay algo, paseamos lo que vino como parametro
          localStorage.setItem(itemName, JSON.stringify(initialValue))
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem)
        }
        setItem(parsedItem)
        setLoading(false)
      } catch (error) {
        setError(error)
      }
    }, 2000); // para que no se ejecute el setState antes de que el componente se renderize 
  });


  /* ---------- guardamos tanto en el estado como en el localStorage ---------- */


  const saveItem = (newItem) => { // guardamos en localStorage 
    try {
      const stringifiedItem = JSON.stringify(newItem)
      localStorage.setItem(itemName, stringifiedItem)
      setItem(newItem) // actualiza desde React

    } catch (error) {
      setError(error)
    }
  }

  return { // por convencion, si tenemos 2 estados enviamos un array, si es más de uno, enviamos un objeto
    item, // retornamos el estado
    saveItem, // retornamos la funcion para guardar en localStorage
    loading,
    error
  };
}
function App() {

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


  return (
    <AppUI
      error={error}
      loading={loading}
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
