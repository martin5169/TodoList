import { useState, useEffect } from "react";

const usePersistentStorage = (key, initialState) => {
  const storedData = localStorage.getItem(key);
  const initialData = storedData ? JSON.parse(storedData) : initialState;

  const [state, setState] = useState(initialData);
    
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default usePersistentStorage;