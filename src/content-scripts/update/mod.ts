import { $ } from '../$';
import { Storage } from '../../Storage';

const ICON_CLASS = 'blocklist-user-icon';

const blockUserIconHtml = `<svg class="${ICON_CLASS}"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					role="img"
					width="30"
					height="30"
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 24 24"
				>
                <title>Hide messages from this user</title>
					<path
                    d="M10 4a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m0 2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0 7c-2.67 0-8 1.33-8 4v3h9.5a6.5 6.5 0 0 1-.47-1.9H3.9V17c0-.64 3.13-2.1 6.1-2.1c.5 0 1 .05 1.5.13a6.5 6.5 0 0 1 1.05-1.74C11.61 13.1 10.71 13 10 13m7.5 0C15 13 13 15 13 17.5s2 4.5 4.5 4.5s4.5-2 4.5-4.5s-2-4.5-4.5-4.5m0 1.5c1.66 0 3 1.34 3 3c0 .56-.15 1.08-.42 1.5L16 14.92c.42-.27.94-.42 1.5-.42M14.92 16L19 20.08c-.42.27-.94.42-1.5.42c-1.66 0-3-1.34-3-3c0-.56.15-1.08.42-1.5z"
                    fill="currentColor"
					/>
			</svg>`;

const unblockUserIconHtml = `
        <svg class="${ICON_CLASS}" width="30" height="30" viewBox="0 0 24 24" style="{margin-left: 5px; cursor: pointer;}">
            <title>Unblock this user</title>
			<path
				fill="currentColor"
				d="M10 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0-6a2 2 0 1 1 0 4c-1.11 0-2-.89-2-2s.9-2 2-2m2 14H2v-3c0-2.67 5.33-4 8-4c.91 0 2.13.16 3.35.47c-.09.33-.15.68-.15 1.03v.89c-.98-.29-2.1-.49-3.2-.49c-2.97 0-6.1 1.46-6.1 2.1v1.1H12V20m8.8-3h-4.3v-2.5c0-.8.7-1.3 1.5-1.3s1.5.5 1.5 1.3v.5h1.3v-.5c0-1.4-1.4-2.5-2.8-2.5s-2.8 1.1-2.8 2.5V17c-.6 0-1.2.6-1.2 1.2v3.5c0 .7.6 1.3 1.2 1.3h5.5c.7 0 1.3-.6 1.3-1.2v-3.5c0-.7-.6-1.3-1.2-1.3Z"
			/>
		</svg>
`;

const addBlockUserIcon = async (post: Element) => {
	const buttons = $.post.buttons(post);
	const username = $.post.username(post);
	if (!buttons || !username) return;

	const users = await Storage.getOrDefault('users', []);
	const isUserBlocked = users.includes(username);

	const svgHtml = isUserBlocked ? unblockUserIconHtml : blockUserIconHtml;
	buttons.insertAdjacentHTML('beforeend', svgHtml);

	const blockedUserIcon = buttons.querySelector(`.${ICON_CLASS}`) as SVGElement;
	blockedUserIcon.addEventListener('click', async () => {
		isUserBlocked ? await Storage.removeUser(username) : await Storage.addUser(username);
		location.reload();
	});
};

const posts = {
	addBlockUserIcon: () => $.posts.forEach(post => addBlockUserIcon(post)),
};

export const Update = {
	posts,
};
