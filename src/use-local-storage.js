export function loadFromLocalStorage(store, key) {
  const currentValue = localStorage.getItem(key);
  if (currentValue) {
    store.set(JSON.parse(currentValue));
  }
}

export function saveToLocalStorage(store, key) {
  store.subscribe(function updateLocalStorage(value) {
    if (value && value.length) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key); // TODO: need?
    }
  });
}
