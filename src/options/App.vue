<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Storage } from '../Storage';
import { PostStyle, SupportedLang } from '../types';
import TabElement from './TabElement.vue';
import TabGroup from './TabGroup.vue';
import IconSettings from './icons/IconSettings.vue';
import BlockList from './BlockList.vue';
import PostStyleSlider from './PostStyleSlider.vue';
import { useUsers } from './useUsers';
import { useKeywords } from './useKeywords';
import { getBrowserLang } from '../content-scripts/lib';
import '../content-scripts/components/blocked-content/blocked-content';

const lang = ref<SupportedLang | null>(null);
const postStyle = ref<PostStyle>('normal');
const { users, inputUser, addUser, deleteUser } = useUsers();
const { keywords, inputKeyword, addKeyword, deleteKeyword } = useKeywords();

watch(
	() => postStyle.value,
	val => Storage.set('postStyle', val)
);

onMounted(async () => {
	try {
		postStyle.value = await Storage.getOrDefault('postStyle', 'normal');
		lang.value = await Storage.getOrDefault('lang', getBrowserLang());
	} catch (err) {
		console.log(err);
	}
});

watch(
	() => lang.value,
	val => {
		if (val !== 'en' && val !== 'ru') return;
		Storage.set('lang', val);
	}
);
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
				<div class="element-presentation">
					<blocked-content
						kind="post"
						user-tooltip="Chris"
						keyword-tooltip="harvest"
						:post-style="postStyle"
						:lang="lang"
					></blocked-content>
				</div>
				<div class="post-style">
					<label for="styleSelect" class="settings-name">Post style</label>
					<div style="flex: 1">
						<post-style-slider
							@post-style-changed="style => (postStyle = style)"
							:post-style="postStyle"
						></post-style-slider>
					</div>
				</div>
				<div class="lang">
					<span class="">Language</span>
					<div class="lang-controls">
						<div>
							<label for="radio-lang-ru">ru</label>
							<input id="radio-lang-ru" type="radio" value="ru" v-model="lang" />
						</div>

						<div>
							<label for="radio-lang-en">en</label>
							<input id="radio-lang-en" type="radio" value="en" v-model="lang" />
						</div>
					</div>
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
}

.container {
	max-width: 75rem;
	margin: 20px auto;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 7rem;
}

@media (width <= 1280px) {
	.container {
		gap: 5rem;
	}
}

@media (width <= 1000px) {
	.container {
		grid-template-columns: 1fr;
		margin-inline: 1rem;
	}
	.lists {
		order: 2;
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
}

.heading-secondary {
	font-weight: 500;
	font-size: 1.4rem;
}

.settings-main {
	margin-top: 1rem;
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
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

.lang {
	font-size: 1.2rem;
	display: flex;
	gap: 1rem;
}

.lang-controls {
	display: flex;
	gap: 1.2rem;
}

.lang-controls > div {
	display: flex;
	gap: 0.2rem;
	align-items: baseline;
}

.element-presentation {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 135px;
	background-color: red;
	background-image: linear-gradient(rgb(24, 24, 24), rgb(26, 27, 27) 10%, rgb(26, 27, 27) 80%, rgb(24, 24, 24));
	border-radius: 1rem;
}

blocked-content {
	font-family: Verdana;
	font-size: 14px;
	transform: translateX(-10px);
}
</style>
