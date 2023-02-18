import { ref, watch, onMounted } from 'vue';
import { PostStyle, SupportedLang } from '../types';
import { Storage } from '../Storage';
import { Default } from '../Default';

export const useSettings = () => {
	const postStyle = ref<PostStyle>(Default.postStyle);
	const lang = ref<SupportedLang>(Default.lang());
	const withIcons = ref<boolean>(Default.withIcons);

	onMounted(async () => {
		try {
			Promise.all([
				(postStyle.value = await Storage.getOrDefault('postStyle', Default.postStyle)),
				(lang.value = await Storage.getOrDefault('lang', Default.lang())),
				(withIcons.value = await Storage.getOrDefault('withIcons', Default.withIcons)),
			]);
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
		}
	);

	watch(
		() => withIcons.value,
		val => Storage.set('withIcons', val)
	);

	return {
		postStyle,
		lang,
		withIcons,
	};
};
