import { BlockedContent } from '../../components/blocked-content/blocked-content';
import { PostStyle } from '../../../types';

const hideName = (link: HTMLAnchorElement) => {
	const initial = link.innerText;
	link.innerText = 'blocked user';
	link.setAttribute('href', '#');
	return initial;
};
const revealName = (link: HTMLAnchorElement, name: string) => {
	link.innerText = name;
};
const hideElement = (element: HTMLElement) => element.classList.add('ext-hidden');
const revealElement = (element: HTMLElement) => element.classList.remove('ext-hidden');

// const hideQuoteHeader = (q: HTMLQuoteElement, appBtn: HTMLButtonElement) => {
// 	const span = q.querySelector('span.quote') as HTMLSpanElement;
// 	const top = q.querySelector('.top') as HTMLElement;
// 	const spanPreserved = span.outerHTML;
// 	const topPreserved = top.outerHTML;
// 	[span, top].forEach(e => hideElement(e));
// 	console.log(span, top);
// 	appBtn.addEventListener('click', () => {
// 		q.insertAdjacentHTML('afterbegin', spanPreserved + topPreserved);
// 	});
// };

const buildQuote = (q: HTMLQuoteElement, blockedUsers: string[], postStyle: PostStyle) => {
	// quote w/o author name
	if (!q.querySelector('.profile-link')) return;

	const authorLink = q.querySelector('.profile-link')!.querySelector('a');
	if (!authorLink) return;
	const author = authorLink.textContent;
	if (!author || !blockedUsers.includes(author)) return;

	const bot = q.querySelector('.bot');
	if (!(bot instanceof HTMLElement)) return;

	// hide quote's content
	hideElement(bot);

	const blockedContent = new BlockedContent({
		postStyle,
		kind: 'quote',
		userTooltip: author,
	});
	blockedContent.addEventListener('button-clicked', () => {
		revealElement(bot);
	});
	q.append(blockedContent);

	if (postStyle === 'full') {
		const name = hideName(authorLink);
		blockedContent.addEventListener('button-clicked', () => revealName(authorLink, name));
	} else if (postStyle === 'min' || postStyle === 'strict' || postStyle === 'normal') {
		const span = q.querySelector('span.quote') as HTMLSpanElement;
		const top = q.querySelector('.top') as HTMLElement;
		hideElement(span);
		hideElement(top);
		blockedContent.addEventListener('button-clicked', () => {
			revealElement(span);
			revealElement(top);
		});
	} else if (postStyle === 'none') {
		return (q.innerHTML = '');
	}
};

export const buildQuotes = (blockedUsers: string[], postStyle: PostStyle) => {
	document.querySelectorAll('blockquote').forEach(q => {
		buildQuote(q, blockedUsers, postStyle);
	});
};
