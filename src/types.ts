export type PostStyle = 'full' | 'normal' | 'min' | 'strict' | 'none';
export type PostOrQuote = 'quote' | 'post';

export type BanCategory = 'users' | 'keywords';

export type BlockedContentProps = {
	postStyle: PostStyle;
	kind: PostOrQuote;
	userTooltip?: string;
	keywordTooltip?: string;
};

export interface SearchData {
	users: string[];
	keywords: string[];
}

export interface StorageItems {
	users: string[];
	keywords: string[];
	postStyle: PostStyle;
}

export type Tooltip = string;
export type Tooltipper = (el: HTMLElement, searchData: SearchData[BanCategory]) => Tooltip;
export type ElementUuid = string;
// export type TooltipsByCategory = Record<BanCategory, Tooltip>;
export type TooltipMap = Map<ElementUuid, Partial<Record<BanCategory, Tooltip>>>;
