export const setLocalStorage = (location,data) => {
    localStorage.setItem(location.toString(), JSON.stringify(data));
}

export const getLocalStorage = (location) => {
    return JSON.parse(localStorage.getItem(location.toString()) || '{}');
}