import { SearchData, SupportedLang } from '../../types';
import { $ } from '../dom/mod';

export class UpdateThreads {
	editNames(users: SearchData['users'], lang: SupportedLang) {
		if (!$.Thread.isThreadsView()) return;
		for (const thread of $.Thread.threads()) {
			const { createdBy, lastPostedBy } = thread;
			if (users.includes(createdBy.name)) createdBy.block(lang);
			if (users.includes(lastPostedBy.name)) lastPostedBy.block(lang);
		}
	}
}
