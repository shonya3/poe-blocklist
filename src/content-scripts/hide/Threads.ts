import { $ } from '../$';
import { SearchData } from '../../types';
import { hideElement } from './mod';

export const hideThreads = (users: SearchData['users'] = []): void => {
	if (!$.thread.isThreadsView()) return;
	for (const thread of $.threads()) {
		const createdBy = $.thread.createdBy(thread);
		if (createdBy && users.includes(createdBy)) {
			hideElement(thread);
		}
	}
};
