import { $ } from '../../$';
import { SearchData, PostStyle, SupportedLang } from '../../../types';
import { Posts } from './Posts';
import { Quotes } from './Quotes';

export const by = (searchData: SearchData, postStyle: PostStyle, lang: SupportedLang, withIcons: boolean): void => {
	Posts.build($.posts, searchData, postStyle, lang, withIcons);
	Quotes.build($.quotes, searchData, postStyle, lang, withIcons);
};
