import React from 'react';
import './TodoSearch.css';

function TodoSearch({ searchValue, setSearchValue }) { // pasamos las props por paramentros, las definimos en variables

  const onSearchValueChange = (event) => { // cuando haya un cambio en el input, llama a la funcion para actualizar el estado 
    console.log(event.target.value);
    setSearchValue(event.target.value); 
  };

  return (
    <input
      className="TodoSearch"
      placeholder="Buscar"
      value={searchValue} // valor del Estado
      onChange={onSearchValueChange} // reacciona a los cambios del input, se ejecuta la funcion de actualización de estado
    />
  );
}

export { TodoSearch };