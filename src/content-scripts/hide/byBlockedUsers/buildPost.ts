import { BlockedContent } from '../../components/blocked-content/blocked-content';
import { BlockedPostInfo } from '../../lib';
import { PostStyle } from '../../../types';

const hideElement = (element: HTMLElement) => element.classList.add('ext-hidden');
const revealElement = (element: HTMLElement) => element.classList.remove('ext-hidden');

const buildPost = (post: HTMLElement, blockedUsers: string[], postStyle: PostStyle) => {
	const postedBy = post.querySelector('a')?.innerText;
	if (!postedBy || !blockedUsers.includes(postedBy)) return;
	const tr = post.closest('tr');
	if (!tr) return;
	const tdContentContainer = tr.querySelector('.content-container') as HTMLTableCellElement;
	const tdPostInfo = tr.querySelector('.post_info') as HTMLTableCellElement;
	if (!tdPostInfo || !tdContentContainer) return;

	hideElement(tdContentContainer);
	hideElement(tdPostInfo);

	const blockedContent = new BlockedContent({
		postStyle,
		kind: 'post',
		userTooltip: postedBy,
	});
	blockedContent.addEventListener('button-clicked', () => {
		revealElement(tdContentContainer);
		revealElement(tdPostInfo);
	});

	tr.append(blockedContent);

	// if (postStyle === 'full') {
	// 	const postDate = tr.querySelector('.post_date')?.textContent ?? '';
	// 	const blockedPostInfo = BlockedPostInfo({ postDate });
	// 	tr.append(blockedPostInfo);
	// 	blockedContent.style.setProperty('height', `150px`);
	// 	blockedContent.addEventListener('button-clicked', () => {
	// 		blockedPostInfo.remove();
	// 	});
	// }
};

export const buildPosts = (blockedUsers: string[], postStyle: PostStyle) => {
	document.querySelectorAll('.post_by_account').forEach(p => buildPost(p as HTMLElement, blockedUsers, postStyle));
};
