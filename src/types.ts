export type PostStyle = 'full' | 'normal' | 'min' | 'strict' | 'none';
export type PostOrQuote = 'quote' | 'post';
export type SupportedLang = 'ru' | 'en';

export type BanCategory = 'users' | 'keywords';

export type BlockedContentProps = {
	postStyle: PostStyle;
	kind: PostOrQuote;
	lang: SupportedLang;
	userTooltip?: string;
	keywordTooltip?: string;
	withIcons: boolean;
};

export interface SearchData {
	users: string[];
	keywords: string[];
}

export interface StorageItems {
	users: string[];
	keywords: string[];
	postStyle: PostStyle;
	lang: SupportedLang;
	withIcons: boolean;
}

export type Option<T> = T | null;
export type Tooltip = string;
export type Tooltipper = (el: HTMLElement, searchData: SearchData[BanCategory]) => Option<Tooltip>;
