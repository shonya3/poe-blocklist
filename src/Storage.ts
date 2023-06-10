import { PostStyle, SupportedLang } from './types';

export interface ExtensionStorage<T> {
	get: () => Promise<Record<string, any>>;
	set: <Key extends keyof T>(key: Key, value: T[Key]) => Promise<void>;
	getOrDefault: <Key extends keyof T>(key: Key, defaultValue: T[Key]) => Promise<T[Key]>;
	clearAll: () => Promise<void>;
	delete: (key: keyof T) => Promise<void>;
}

export interface StorageItems {
	users: string[];
	keywords: string[];
	postStyle: PostStyle;
	lang: SupportedLang;
	withIcons: boolean;
}

export const Storage = {
	async getOrDefault(key, defaultValue) {
		const resultObject = await chrome.storage.sync.get(key);
		if (!Object.hasOwn(resultObject, key)) {
			return defaultValue;
		}
		return resultObject[key];
	},
	get: () => chrome.storage.sync.get(),
	set: (key, value) => chrome.storage.sync.set({ [`${key}`]: value }),
	clearAll: () => chrome.storage.sync.clear(),
	delete: async key => chrome.storage.sync.remove(key),
	async addUser(user) {
		console.log('add user');
		const users = await this.getOrDefault('users', []);
		const userExists = users.some(u => u.toLowerCase() === user.toLowerCase());
		if (!userExists) {
			this.set('users', [user, ...users]);
		}
	},
	async removeUser(user) {
		let users = await this.getOrDefault('users', []);
		users = users.filter(u => u !== user);
		this.set('users', users);
	},
} satisfies ExtensionStorage<StorageItems> & {
	addUser: (user: string) => Promise<void>;
	removeUser: (user: string) => Promise<void>;
};
