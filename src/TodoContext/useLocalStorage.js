import React from 'react';

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
      }, 500); // para que no se ejecute el setState antes de que el componente se renderize 
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

  export { useLocalStorage };