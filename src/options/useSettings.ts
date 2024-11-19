import { ref, watch, onMounted } from 'vue';
import { PostStyle, SupportedLang } from '../types';
import { Storage } from '../Storage';
import { Default } from '../Default';
import { Option } from '../types';

const LOCAL_STORAGE_LANG_KEY = 'lang';

const getLocalStorageLang = (): Option<SupportedLang> => {
	const lang = localStorage.getItem(LOCAL_STORAGE_LANG_KEY);
	if (lang !== 'ru' && lang !== 'en') return null;
	return lang;
};

export const useSettings = () => {
	const postStyle = ref<PostStyle>(Default.postStyle);
	const lang = ref<SupportedLang>(getLocalStorageLang() ?? Default.lang());
	const withIcons = ref<boolean>(Default.withIcons);
	const shouldHideThreads = ref<boolean>(Default.hideThreadsCreatedByBlockedUsers);
	const hide_by_indiscriminated_username_aswell = ref<boolean>(Default.hide_by_indiscriminated_username_aswell);

	onMounted(async () => {
		try {
			const [_postStyle, _lang, _withIcons, _shouldHideThreads, _hide_by_indiscriminated_username_aswell] =
				await Promise.all([
					Storage.getOrDefault('postStyle', Default.postStyle),
					Storage.getOrDefault('lang', getLocalStorageLang() ?? Default.lang()),
					Storage.getOrDefault('withIcons', Default.withIcons),
					Storage.getOrDefault('hideThreadsCreatedByBlockedUsers', Default.hideThreadsCreatedByBlockedUsers),
					Storage.getOrDefault(
						'hide_by_indiscriminated_username_aswell',
						Default.hide_by_indiscriminated_username_aswell
					),
				]);

			postStyle.value = _postStyle;
			lang.value = _lang;
			withIcons.value = _withIcons;
			shouldHideThreads.value = _shouldHideThreads;
			localStorage.setItem(LOCAL_STORAGE_LANG_KEY, _lang);
			hide_by_indiscriminated_username_aswell.value = _hide_by_indiscriminated_username_aswell;
		} catch (err) {
			console.log(err);
		}
	});

	watch(
		() => postStyle.value,
		val => Storage.set('postStyle', val)
	);

	watch(
		() => lang.value,
		val => {
			if (val !== 'en' && val !== 'ru') return;
			Storage.set('lang', val);
			localStorage.setItem(LOCAL_STORAGE_LANG_KEY, val);
		}
	);

	watch(
		() => withIcons.value,
		val => Storage.set('withIcons', val)
	);

	watch(
		() => shouldHideThreads.value,
		val => Storage.set('hideThreadsCreatedByBlockedUsers', val)
	);

	watch(
		() => hide_by_indiscriminated_username_aswell.value,
		val => Storage.set('hide_by_indiscriminated_username_aswell', val)
	);

	return {
		postStyle,
		lang,
		withIcons,
		shouldHideThreads,
		hide_by_indiscriminated_username_aswell,
	};
};
