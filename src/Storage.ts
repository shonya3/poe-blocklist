import { PostStyle, SupportedLang } from './types';

export interface StorageItems {
	users: string[];
	keywords: string[];
	postStyle: PostStyle;
	lang: SupportedLang;
	withIcons: boolean;
}

export interface ExtensionStorage<T> {
	get: () => Promise<Record<string, unknown>>;
	set: <Key extends keyof T>(key: Key, value: T[Key]) => Promise<void>;
	getOrDefault: <Key extends keyof T>(key: Key, defaultValue: T[Key]) => Promise<T[Key]>;
	clearAll: () => Promise<void>;
	delete: (key: keyof T) => Promise<void>;
}

export interface UserFunctions {
	addUser: (user: string) => Promise<void>;
	removeUser: (user: string) => Promise<void>;
}

export const Storage: ExtensionStorage<StorageItems> & UserFunctions = {
	async getOrDefault(key, defaultValue) {
		const resultObject = await chrome.storage.sync.get(key);
		if (!Object.hasOwn(resultObject, key)) {
			return defaultValue;
		}
		return resultObject[key];
	},
	async get() {
		return chrome.storage.sync.get();
	},
	async set(key, value) {
		return chrome.storage.sync.set({ [`${key}`]: value });
	},
	async clearAll() {
		return chrome.storage.sync.clear();
	},
	async delete(key) {
		return chrome.storage.sync.remove(key);
	},
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
};
