import { SearchData, SupportedLang } from '../../types';
import { Forum } from '../Dom/mod';

export class UpdateForums {
	editNames({
		users,
		lang,
		hide_by_indiscriminated_username_aswell,
	}: {
		users: SearchData['users'];
		lang: SupportedLang;
		hide_by_indiscriminated_username_aswell: boolean;
	}): void {
		if (!Forum.isForumsView()) return;
		for (const forum of Forum.forums()) {
			const { lastPostedBy } = forum;
			if (lastPostedBy.name.discriminated && users.includes(lastPostedBy.name.discriminated)) {
				lastPostedBy.block(lang);
			}

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
