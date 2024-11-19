import { SearchData, SupportedLang } from '../../types';
import { Thread } from '../Dom/mod';

export class UpdateThreads {
	editNames({
		users,
		lang,
		hide_by_indiscriminated_username_aswell,
	}: {
		users: SearchData['users'];
		lang: SupportedLang;
		hide_by_indiscriminated_username_aswell: boolean;
	}) {
		if (!Thread.isThreadsView()) return;
		for (const thread of Thread.threads()) {
			const { createdBy, lastPostedBy } = thread;
			if (createdBy.name.discriminated && users.includes(createdBy.name.discriminated)) {
				createdBy.block(lang);
			}

			if (createdBy.name.indiscriminated && users.includes(createdBy.name.indiscriminated)) {
				createdBy.block(lang);
			}

			if (lastPostedBy.name.discriminated && users.includes(lastPostedBy.name.discriminated))
				lastPostedBy.block(lang);
			if (
				hide_by_indiscriminated_username_aswell &&
				lastPostedBy.name.indiscriminated &&
				users.includes(lastPostedBy.name.indiscriminated)
			) {
				lastPostedBy.block(lang);
			}
		}
	}
}
