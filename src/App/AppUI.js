import React from "react";
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton'; // como no encuentra un archivo, buscar la carpeta llamada de esta manera. Y como no especificamos dentro de la carpeta que archivo, busca por defecto el llamado "index.js
import { TodoContext } from '../TodoContext';

function AppUI() {
    return (
        <React.Fragment>
            <TodoCounter />
            <TodoSearch />
            <TodoContext.Consumer>
                {({
                error, 
                loading, 
                searchedTodos, 
                completeTodo, 
                deleteTodo}
                ) => (
                    <TodoList>

                        {loading && <p>Loading...</p>}
                        {error && <p>Error</p>}
                        {(!loading && !searchedTodos.length) && <p>No hay resultados, crea tu primer Todo!</p>}

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
                )}
            </TodoContext.Consumer>
            <CreateTodoButton/>
        </React.Fragment>

    );
}

export { AppUI };