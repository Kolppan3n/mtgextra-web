import { useState, useEffect } from "react";

const getSavedValue = (key: string, initValue: any) => {
  try {
    if (localStorage.getItem(key) !== null) {
      const savedValue = JSON.parse(localStorage.getItem(key) as string);
      return savedValue;
    }
    return initValue;
  } catch (error) {
    console.log(error);
    return initValue;
  }
};

const useLocalStorage = (key: string, initValue: any) => {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initValue);
  });

  useEffect(() => {
    console.log("! Value Updated !");
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export const shuffle = <T>(array: T[]): T[] => array.slice().sort(() => Math.random() - 0.5);

const getSavedValueTest = <T>(key: string, initValue: T): T => {
  try {
    if (typeof localStorage !== "undefined" && localStorage.getItem(key) !== null) {
      const savedValue = JSON.parse(localStorage.getItem(key) as string);
      return savedValue;
    }
    return initValue;
  } catch (error) {
    console.log(error);
    return initValue;
  }
};

export const useLocalStorageTest = <T>(key: string, initValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState(() => {
    return getSavedValueTest<T>(key, initValue);
  });

  useEffect(() => {
    console.log("! Value Updated !");
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
