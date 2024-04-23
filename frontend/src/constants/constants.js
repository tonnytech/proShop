// export const setLocalStorage = (location,data) => {
//     localStorage.setItem(location.toString(), JSON.stringify(data));
// }

// export const getLocalStorage = (location) => {
//     return JSON.parse(localStorage.getItem(location.toString()) || '[]');
// }

export const getLocalStorage = (location) => {
    const storedData = JSON.parse(localStorage.getItem(location.toString()) || '[]');
    return Array.isArray(storedData) ? storedData : Object.values(storedData);
  };

  export const setLocalStorage = (location, data) => {
    localStorage.setItem(location.toString(), JSON.stringify([].concat(data)));
  }