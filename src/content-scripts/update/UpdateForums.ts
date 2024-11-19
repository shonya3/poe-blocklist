import { SearchData, SupportedLang } from '../../types';
import { Forum } from '../Dom/mod';

export class UpdateForums {
	editNames(users: SearchData['users'], lang: SupportedLang): void {
		if (!Forum.isForumsView()) return;
		for (const forum of Forum.forums()) {
			const { lastPostedBy } = forum;
			if (users.includes(lastPostedBy.name)) lastPostedBy.block(lang);
		}
	}
}
