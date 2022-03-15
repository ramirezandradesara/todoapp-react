import React from 'react';
import './TodoSearch.css';

function TodoSearch({ searchValue, setSearchValue }) { // pasamos las props por paramentros, las definimos en variables

  const onSearchValueChange = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  return (
    <input
      className="TodoSearch"
      placeholder="Cebolla"
      value={searchValue}
      onChange={onSearchValueChange}
    />
  );
}

export { TodoSearch };