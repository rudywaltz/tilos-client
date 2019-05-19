export default function useLocalStorage(store, key) {
	const currentValue = localStorage.getItem(key);

	if (currentValue) {
		store.set(JSON.parse(currentValue));
	}

	store.subscribe(value => {
		console.log('store', value);
		// localStorage.setItem(key, JSON.stringify(value));
	});
}
