import React from "react";
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton'; // como no encuentra un archivo, buscar la carpeta llamada de esta manera. Y como no especificamos dentro de la carpeta que archivo, busca por defecto el llamado "index.js

function AppUI({
    total,
    completed,
    searchValue,
    setSearchValue,
    searchedTodos,
    completeTodo,
    deleteTodo,
}) {
    return (
        <React.Fragment>
            <TodoCounter // enviamos las propiedades de arriba ☝
                total={total}
                completed={completed}           
            />
            <TodoSearch
                searchValue={searchValue} // hacemos referencia a las consts de arriba ☝
                setSearchValue={setSearchValue}
            />

            <TodoList>
                {searchedTodos.map(todo => ( // no iteramos en el array estatico sino en el que viene de la condición si escribieron
                    <TodoItem
                        key={todo.text}
                        text={todo.text}
                        completed={todo.completed}
                        onComplete={() => completeTodo(todo.text)}
                        onDelete={() => deleteTodo(todo.text)}
                       
                    />
                ))}
            </TodoList>

            <CreateTodoButton />
        </React.Fragment>

    );
}

export { AppUI };