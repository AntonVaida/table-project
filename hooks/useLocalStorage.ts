import { useState, useEffect } from "react";

export const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const [value, setValue] = useState<T | undefined>(() => {
    if (typeof window !== "undefined") {
      try {
        const storedValue = localStorage.getItem(key);
        if (storedValue !== null) {
          const parsedValue: unknown = JSON.parse(storedValue);
          return typeof parsedValue === typeof initialValue ? (parsedValue as T) : initialValue;
        }
      } catch (error) {
        console.error("Error parsing localStorage value:", error);
      }
    }
    return initialValue;
  });

  useEffect(() => {
    if (typeof window !== "undefined" && value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  const updateValue = (newValue: T | ((prevValue: T | undefined) => T)) => {
    setValue((prev) => (typeof newValue === "function" ? (newValue as (prev: T | undefined) => T)(prev) : newValue));
  };

  return { value, updateValue };
};
