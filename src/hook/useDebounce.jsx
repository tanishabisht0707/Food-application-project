 
 import React, { useEffect, useState } from 'react'
 
 function useDebounce(query) {
    const [debounce,setDebounce] = useState('');

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebounce(query);
      },350)

      return () => clearTimeout(timer);
    },[query])
   return debounce
 }
 
 export default useDebounce;
 