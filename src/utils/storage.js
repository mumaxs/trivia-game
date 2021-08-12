export const getStorage = key => {
    let storage = localStorage.getItem(key);

    if (storage) {
        return JSON.parse((storage));
    } else {
        return false;
    }
}

export const setStorage = (key, value) => {
    const json = JSON.stringify(value);
    localStorage.setItem(key, json);
}