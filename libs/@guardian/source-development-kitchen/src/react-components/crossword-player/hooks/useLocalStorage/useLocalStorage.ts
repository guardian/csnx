import * as React from 'react';

export default function useLocalStorage<T>(key: string, initialValue?: T) {
	const [storedValue, setStoredValue] = React.useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item !== null ? JSON.parse(item) : initialValue;
		} catch (error: unknown) {
			return initialValue;
		}
	});

	// return a wrapped version of useState's setter function that
	// persists the new value to localStorage.
	const setValue = (value: T | ((val: T) => T)) => {
		// allow value to be a function so we have same API as useState
		const valueToStore = value instanceof Function ? value(storedValue) : value;
		setStoredValue(valueToStore);

		window.localStorage.setItem(key, JSON.stringify(valueToStore));
	};

	return [storedValue, setValue] as const;
}
