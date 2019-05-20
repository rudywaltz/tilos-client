export const loadFromLocalStorage = (store, key) => {
	const currentValue = localStorage.getItem(key);
	if (currentValue) {
		store.set(JSON.parse(currentValue));
	}
}

export const saveToLocalStorage = (store, key) => {
	store.subscribe(value => {
		if (value.length) {
			localStorage.setItem(key, JSON.stringify(value));
		} else {
      localStorage.removeItem(key); // TODO: need?
		}
	});
}
