// export const getLocalStorage = (location) => {
//   const storedData = localStorage.getItem(location.toString());
//   return storedData ? JSON.parse(storedData) : [];
// }

// export const getLocalStorage = (location) => JSON.parse(localStorage.getItem(location) || '[]');

export const getLocalStorage = (location) => {
  const storedData = localStorage.getItem(location);
  return storedData ? JSON.parse(storedData) : [];
};

  export const setLocalStorage = (location, data) => {
    localStorage.setItem(location.toString(), JSON.stringify([].concat(data)));
  }

  export const arrayToObject = (array) => {
   if (array.length){
    return array[0]
   } else {
    return []
   }
  }