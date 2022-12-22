import { PostStyle } from '../../../types';
import { buildPosts } from './buildPost';
import { buildQuotes } from './buildQuote';

export const byBlockedUsers = (blockedUsers: string[], postStyle: PostStyle) => {
	buildPosts(blockedUsers, postStyle);
	buildQuotes(blockedUsers, postStyle);
};
