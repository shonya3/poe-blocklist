import { PostStyle } from '../../types';
import { BlockedContent } from '../components/blocked-content/blocked-content';
import { getElementDirectText, hideElement, revealElement } from './mod';

export const byKeywords = (keywords: string[], postStyle: PostStyle): void => {
	checkPosts(keywords, postStyle);
	checkQuotes(keywords, postStyle);
};

const checkQuote = (q: HTMLQuoteElement, keywords: string[], postStyle: PostStyle): void => {
	if (!q.querySelector('.profile-link')) return;

	const authorLink = q.querySelector('.profile-link')!.querySelector('a');
	if (!authorLink) return;
	const author = authorLink.textContent;
	if (!author) return;

	const bot = q.querySelector('.bot');
	if (!(bot instanceof HTMLElement)) return;

	// const text = bot.textContent;
	// if (!text) return;

	const text = getElementDirectText(bot);

	const foundKeywords = keywords.filter(word => text.includes(word));

	if (!foundKeywords.length) return;

	const spaceEscapedWords = foundKeywords.join(', ').replace(/[ ]/g, '\u00a0');
	hideElement(bot);

	const blockedContent = new BlockedContent({
		postStyle,
		kind: 'quote',
		keywordTooltip: spaceEscapedWords,
	});
	blockedContent.addEventListener('button-clicked', () => {
		revealElement(bot);
	});
	q.append(blockedContent);

	if (postStyle === 'none') {
		q.innerHTML = '';
	} else {
		const span = q.querySelector('span.quote') as HTMLSpanElement;
		const top = q.querySelector('.top') as HTMLElement;
		hideElement(span);
		hideElement(top);
		blockedContent.addEventListener('button-clicked', () => {
			revealElement(span);
			revealElement(top);
		});
	}
};

const checkQuotes = (keywords: string[], postStyle: PostStyle): void => {
	document.querySelectorAll('blockquote').forEach(q => {
		checkQuote(q, keywords, postStyle);
	});
};

const checkPost = (post: HTMLElement, keywords: string[], postStyle: PostStyle): void => {
	const postedBy = post.querySelector('a')?.innerText;
	if (!postedBy) return;
	const tr = post.closest('tr');
	if (!tr) return;
	const tdContentContainer = tr.querySelector('.content-container') as HTMLTableCellElement;
	const tdPostInfo = tr.querySelector('.post_info') as HTMLTableCellElement;
	if (!tdPostInfo || !tdContentContainer) return;

	// const text = tdContentContainer.textContent;
	// if (!text) return;

	const text = getElementDirectText(tr.querySelector('.content')!);

	const foundKeywords = keywords.filter(word => text.toLowerCase().includes(word.toLowerCase()));

	if (!foundKeywords.length) return;

	const spaceEscapedWords = foundKeywords.join(', ').replace(/[ ]/g, '\u00a0');

	hideElement(tdContentContainer);
	hideElement(tdPostInfo);

	const blockedContent = new BlockedContent({
		postStyle,
		kind: 'post',
		keywordTooltip: spaceEscapedWords,
	});
	blockedContent.addEventListener('button-clicked', () => {
		revealElement(tdContentContainer);
		revealElement(tdPostInfo);
	});

	tr.append(blockedContent);
};
const checkPosts = (keywords: string[], postStyle: PostStyle): void => {
	document.querySelectorAll('.post_by_account').forEach(p => checkPost(p as HTMLElement, keywords, postStyle));
};
