import React from 'react';
import './TodoItem.css';
import { FaCheck } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';

function TodoItem(props) {
  

  return (
    <li className="TodoItem">
      <span
        className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
        onClick={props.onComplete} // Si ponemos onComplete() se ejecuta apenas se refresque la página, no cuando se dispara el evento
      >
        <FaCheck />
      </span>
      <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>
        {props.text}
      </p>
      <span   
      className="Icon Icon-delete"
      onClick = {props.onDelete}
      >
        <RiDeleteBin5Line />
      </span>
    </li>
  );
}

export { TodoItem };
