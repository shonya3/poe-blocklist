import { $ } from '../dom/mod';
import { Option } from '../../types';
import { CharacterInfo, InventoryItem } from './types';

export const getCharacterInfo = async (accountName: string, character: string) => {
	const { origin } = window.location;
	const href = `${origin}/character-window/get-characters`;
	const url = new URL(href);

	url.searchParams.append('accountName', accountName);
	url.searchParams.append('character', character);

	const response = await fetch(url);
	const data = await response.json();
	return data;
};

const loadActiveCharacters = async (profiles: string[]) => {
	console.time('user');
	const res = await fetch(`https://poe-blocklist-service.onrender.com/active-character-names`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ profiles }),
	});
	const data = (await res.json()) as Record<string, string>[];
	return data;
};

const info = async (profiles: string[]) => {
	const res = await fetch(`https://poe-blocklist-service.onrender.com/info`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ profiles }),
	});
	const data = await res.json();
	return data;
};

export const Character = {
	getCharacterInfo,
	loadActiveCharacters,
	info,
};

const findGemWithMostLinks = (items: InventoryItem[]) => {
	for (const item of items) {
		let linksNumber = 0;
	}
};

const getLinksInfo = (item: InventoryItem) => {
	item.socketedItems.forEach(item => {
		console.log(item.socket);
	});
};
const getActiveGem = (items: InventoryItem[]) => {};
const extractCharacterInfo = ({ items, character }: CharacterInfo) => {};
