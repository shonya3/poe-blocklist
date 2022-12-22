import { ref, watch, onMounted } from 'vue';
import { Storage } from '../Storage';
export const useKeywords = () => {
	const keywords = ref<string[]>([]);
	const inputKeyword = ref('');
	const addKeyword = (keyword: string) => {
		if (!keyword) return;
		if (keywords.value.includes(keyword)) return;
		keywords.value.unshift(keyword);
		inputKeyword.value = '';
	};

	const deleteKeyword = (keyword: string) => {
		keywords.value = keywords.value.filter(word => word !== keyword);
	};

	watch(
		() => keywords.value,
		val => Storage.set('keywords', Array.from(val)),
		{ deep: true }
	);

	onMounted(async () => {
		try {
			keywords.value = await Storage.getOrDefault('keywords', []);
		} catch (err) {
			console.log(err);
		}
	});

	return {
		keywords,
		inputKeyword,
		addKeyword,
		deleteKeyword,
	};
};
