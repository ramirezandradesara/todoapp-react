import React from 'react';
import './TodoCounter.css';

function TodoCounter({total, completed}) {
  // const {completed, total} = props; // otra opción 

  return (
    <h2 className="TodoCounter">Has completado {completed} de {total} TODOs</h2>
  );
}

export { TodoCounter };
