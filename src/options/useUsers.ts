import { ref, watch, onMounted } from 'vue';
import { Storage } from '../Storage';
export const useUsers = () => {
	const users = ref<string[]>([]);
	const inputUser = ref('');

	const addUser = (user: string) => {
		if (!user) return;
		if (users.value.includes(user)) return;
		users.value.unshift(user);
		inputUser.value = '';
		console.log(inputUser.value);
	};

	const deleteUser = (user: string) => {
		users.value = users.value.filter(u => u !== user);
	};

	watch(
		() => users.value,
		val => Storage.set('users', Array.from(val)),
		{ deep: true }
	);

	onMounted(async () => {
		try {
			users.value = await Storage.getOrDefault('users', []);
		} catch (err) {
			console.log(err);
		}
	});

	return {
		users,
		inputUser,
		addUser,
		deleteUser,
	};
};
