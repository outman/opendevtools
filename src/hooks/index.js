'use client';

import {useEffect, useState, useRef } from "react";


export const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(initialValue);
    const initRef = useRef(initialValue);

    useEffect(() => {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        setValue(JSON.parse(storedValue));
      }
    }, [key]);

    useEffect(() => {
      if (value !== initRef.current) {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        let storedValue = localStorage.getItem(key);
        if (!storedValue) {
          localStorage.setItem(key, JSON.stringify(value));
        }
      }
    }, [key, value]);

    return [value, setValue];
  };
