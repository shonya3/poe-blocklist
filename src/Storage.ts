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

const addUser = async (user: string) => {
	const users = await getOrDefault('users', []);
	const hasThisUser = Boolean(users.find(u => u.toLowerCase() === user.toLowerCase()));
	console.log(hasThisUser);
	if (hasThisUser) return;
	users.push(user);
	set('users', users);
};

const removeUser = async (user: string) => {
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

// export class Storage {
// 	static async get() {
// 		return chrome.storage.sync.get();
// 	}
// 	static async set<Key extends keyof StorageItems>(key: Key, value: StorageItems[Key]): Promise<void> {
// 		chrome.storage.sync.set({ [`${key}`]: value });
// 	}

// 	static async getOrDefault<Key extends keyof StorageItems>(
// 		key: Key,
// 		defaultValue: StorageItems[Key]
// 	): Promise<StorageItems[Key]> {
// 		const resultObject = await chrome.storage.sync.get(key);
// 		if (!Object.hasOwn(resultObject, key)) {
// 			return defaultValue;
// 		}

// 		return resultObject[key];
// 	}

// 	static async clearAll() {
// 		return chrome.storage.sync.clear();
// 	}

// 	static async delete(key: keyof StorageItems) {
// 		return chrome.storage.sync.remove(key);
// 	}
// }
