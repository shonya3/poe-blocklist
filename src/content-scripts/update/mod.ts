import { UpdatePosts } from './UpdatePosts';
import { UpdateThreads } from './UpdateThreads';
import { UpdatePage } from './UpdatePage';
import { UpdateForums } from './UpdateForums';

export class Update {
	static posts = new UpdatePosts();
	static threads = new UpdateThreads();
	static page = new UpdatePage();
	static forums = new UpdateForums();
}
