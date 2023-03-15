import { StorageItems } from './types';

const get = async (): Promise<Record<string, any>> => chrome.storage.sync.get();

const set = <TKey extends keyof StorageItems>(key: TKey, value: StorageItems[TKey]): Promise<void> =>
	chrome.storage.sync.set({ [`${key}`]: value });

const getOrDefault = async <TKey extends keyof StorageItems>(
	key: TKey,
	defaultValue: StorageItems[TKey]
): Promise<StorageItems[TKey]> => {
	const resultObject = await chrome.storage.sync.get(key);
	if (!Object.hasOwn(resultObject, key)) {
		return defaultValue;
	}

	return resultObject[key];
};

const clearAll = async (): Promise<void> => chrome.storage.sync.clear();

const addUser = async (user: string): Promise<void> => {
	const users = await getOrDefault('users', []);
	const hasThisUser = users.some(u => u.toLowerCase() === user.toLowerCase());
	if (hasThisUser) return;
	users.unshift(user);
	set('users', users);
};

const removeUser = async (user: string): Promise<void> => {
	let users = await getOrDefault('users', []);
	users = users.filter(u => u !== user);
	set('users', users);
};

export const Storage = {
	getOrDefault,
	get,
	set,
	clearAll,
	delete: async (key: keyof StorageItems): Promise<void> => chrome.storage.sync.remove(key),
	addUser,
	removeUser,
};
