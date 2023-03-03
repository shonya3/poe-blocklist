import { Option } from '../../types';
import { CharacterInfo, InventoryItem } from './types';
const getCharacterInfo = async (account: string, character: string) => {
	const { origin } = window.location;
	try {
		const url = new URL(`${origin}/character-window/get-items`);
		url.searchParams.append('accountName', account);
		url.searchParams.append('character', character);
		const response = await fetch(url);
		const items = (await response.json()) as Promise<InventoryItem>;
		return items;
		// return items;
	} catch (err) {
		console.log(`ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR`, err);
	}
};

const loadActiveCharNames = async (profiles: string[]) => {
	console.time('user');
	const res = await fetch(`https://poe-blocklist-service.onrender.com/active-character-names`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ profiles: $.uniqueUsernames }),
	});
	const data = await res.json();
};

export const Character = {
	getCharacterInfo,
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
