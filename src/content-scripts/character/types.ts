export interface InventoryItem {
	verified: boolean;
	w: number;
	h: number;
	icon: string;
	league: string;
	id: string;
	sockets: { group: number; attr: string; sColour: 'R' | 'G' | 'B' }[];
	name: string;
	typeLine: string;
	baseType: string;
	identified: boolean;
	ilvl: number;
	properties: { name: string; values: Array<string | number>; displayMode: number; type: number }[];
	requirements: ItemRequirement[];
	implicitMods: string[];
	explicitMods: string[];
	flavourText: string[];
	frameType: number;
	x: number;
	y: number;
	inventoryId:
		| 'Weapon'
		| 'Weapon2'
		| 'Offhand'
		| 'Offhand2'
		| 'Helm'
		| 'BodyArmour'
		| 'Gloves'
		| 'Boots'
		| 'Belt'
		| 'Ring'
		| 'Ring2'
		| 'Amulet'
		| 'Flask';

	socketedItems: SocketedItem[];
}

export interface SocketedItem {
	verified: boolean;
	w: number;
	h: number;
	icon: number;
	support: boolean;
	league: string;
	id: string;
	name: string;
	typeLine: string;
	baseType: string;
	identified: true;
	ilvl: 0;
	properties: {
		name: string;
		values: Array<string | number>;
		displayMode: number;
		type?: number;
	}[];
	requirements: ItemRequirement[];
	additionalProperties: unknown[];
	nextLevelRequirements: ItemRequirement[];
	descrText: string;
	frameType: number;
	socket: number;
	colour: GemColor;
}

export interface ItemRequirement {
	name: 'Level' | 'Str' | 'Dex' | 'Int';
	values: Array<string | number>;
	displayMode: number;
	type: number;
}

export type GreenColorCode = 'D';
export type RedColorCode = 'S';
export type BlueColorCode = 'I';
export type GemColor = GreenColorCode | RedColorCode | BlueColorCode;

export interface Character {
	name: string;
	league: string;
	classId: number;
	ascendancyClass: 1;
	class: string;
	level: number;
	experience: number;
}

export interface CharacterInfo {
	items: InventoryItem[];
	character: Character;
}
