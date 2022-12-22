<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Storage } from '../Storage';
import { PostStyle } from '../types';
import TabElement from './TabElement.vue';
import TabGroup from './TabGroup.vue';
import IconSettings from './icons/IconSettings.vue';
import BlockList from './BlockList.vue';
import { useUsers } from './useUsers';
import { useKeywords } from './useKeywords';

const { users, inputUser, addUser, deleteUser } = useUsers();
const { keywords, inputKeyword, addKeyword, deleteKeyword } = useKeywords();
const postStyle = ref<PostStyle>('normal');
const postStyles: PostStyle[] = ['none', 'min', 'strict', 'normal', 'full'];
const postStyleOptions = postStyles.map(option => {
	return {
		text: option,
		value: option,
	};
});

watch(
	() => postStyle.value,
	val => Storage.set('postStyle', val)
);

onMounted(async () => {
	try {
		postStyle.value = await Storage.getOrDefault('postStyle', 'normal');
	} catch (err) {
		console.log(err);
	}
});
</script>

<template>
	<div class="container">
		<tab-group class="lists">
			<tab-element title="users">
				<block-list
					@add-item="addUser"
					@delete-item="deleteUser"
					:items="users"
					label-block="Block User"
					v-model="inputUser"
				></block-list>
			</tab-element>

			<tab-element title="keywords">
				<block-list
					@add-item="addKeyword"
					@delete-item="deleteKeyword"
					label-block="Add Keywords"
					:items="keywords"
					v-model="inputKeyword"
				></block-list>
			</tab-element>
		</tab-group>

		<div class="settings">
			<header>
				<h2 class="heading-secondary settings-header">
					<icon-settings></icon-settings>
					<span>Settings</span>
				</h2>
			</header>
			<main class="settings-main">
				<div class="post-style">
					<label for="styleSelect" class="settings-name">Post style</label>
					<select id="styleSelect" v-model="postStyle">
						<option v-for="option in postStyleOptions" :value="option.value">{{ option.text }}</option>
					</select>
				</div>
			</main>
		</div>
	</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;700&display=swap');

* {
	box-sizing: border-box;
	padding: 0;
	margin: 0;
}

:root {
	font-family: 'Open Sans', sans-serif;
	color: #374151;
	font-size: 100%;
}

.container {
	max-width: 75rem;
	margin: 20px auto;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 7rem;
}

@media (max-width: 80em) {
	.container {
		gap: 5rem;
	}
}

@media (max-width: 64em) {
	.container {
		gap: 3rem;
		margin-inline: 2rem;
	}
}

@media (max-width: 50em) {
	.container {
		grid-template-columns: 1fr;
		margin-inline: 1rem;
	}
	.lists {
		order: 2;
	}

	.settings {
		margin-left: 5rem;
	}
}

.settings {
	padding: 0.5rem 1rem;
}

.options-btn {
	border: none;
	background: none;
	cursor: pointer;
	padding: 0.4rem;
}

select {
	border-radius: 0.2rem;
	padding: 0.3rem 0.6rem;
	font-size: large;
}

.post-style {
	display: flex;
	gap: 20px;
	align-items: center;
}

.heading-secondary {
	font-weight: 500;
	font-size: 1.4rem;
}

.settings-main {
	margin-top: 1rem;
}

.settings-name {
	font-size: 1.2rem;
}

.settings-header {
	display: flex;
	align-items: center;
	gap: 0.4rem;
	margin-top: 0.8rem;
}
</style>
