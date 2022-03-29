import React from "react";
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton'; // como no encuentra un archivo, buscar la carpeta llamada de esta manera. Y como no especificamos dentro de la carpeta que archivo, busca por defecto el llamado "index.js
import { TodoContext } from '../TodoContext';
import { Modal } from '../Modal';
import { TodoForm } from '../TodoForm';

function AppUI() {
    const {
        error,
        loading,
        searchedTodos,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
    } = React.useContext(TodoContext);


    return (
        <React.Fragment>
            <TodoCounter />
            <TodoSearch />

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
{openModal && (
    <Modal>
       <TodoForm />
    </Modal>
)}
            <CreateTodoButton
            setOpenModal={setOpenModal}
            openModal={openModal}
            />
        </React.Fragment>

    );
}

export { AppUI };