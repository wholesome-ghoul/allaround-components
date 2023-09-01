import React from "react";

type F<T> = (s: T) => T;

function useLocalStorage <T>(
  key: string,
  initialValue?: string | boolean | number | T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = React.useState(() => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      return initialValue;
    }
  });

  const setValue = (value: T | F<T>) => {
    try {
      value = typeof value === "function" ? (value as F<T>)(state) : value;
      setState(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  };

  return [state, setValue];
};

export default useLocalStorage;
