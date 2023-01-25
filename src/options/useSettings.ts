import { ref, watch, onMounted } from 'vue';
import { getBrowserLang } from '../lib';
import { PostStyle, SupportedLang } from '../types';
import { Storage } from '../Storage';

export const useSettings = () => {
	const postStyle = ref<PostStyle>('normal');
	const lang = ref<SupportedLang>(getBrowserLang());
	const withIcons = ref(true);

	onMounted(async () => {
		try {
			postStyle.value = await Storage.getOrDefault('postStyle', 'normal');
			lang.value = await Storage.getOrDefault('lang', getBrowserLang());
			withIcons.value = await Storage.getOrDefault('withIcons', true);
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
