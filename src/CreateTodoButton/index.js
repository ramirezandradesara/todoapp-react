import React from 'react';
import './CreateTodoButton.css';

function CreateTodoButton(props) {

  const onClickButton = (msg) => {
    alert('msg')
  }

  return (
    <button className="CreateTodoButton"
      onClick={() => onClickButton('Modal')} // mandamos la funcion en otra funcion 
    >
      +
    </button>
  );
}

export { CreateTodoButton };
