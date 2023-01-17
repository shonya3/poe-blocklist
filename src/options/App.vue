<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
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
import { translate } from '../translate';

const lang = ref<SupportedLang>(getBrowserLang());
const t = computed(() => translate(lang.value));
const postStyle = ref<PostStyle>('normal');
const withIcons = ref(true);
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
		withIcons.value = await Storage.getOrDefault('withIcons', true);
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

watch(
	() => withIcons.value,
	val => Storage.set('withIcons', val)
);
</script>

<template>
	<div class="container">
		<tab-group class="lists" :key="t('users')">
			<tab-element tab="users" :title="t('users')">
				<block-list
					@add-item="addUser"
					@delete-item="deleteUser"
					:items="users"
					:label-block="t('blockUser')"
					v-model="inputUser"
				></block-list>
			</tab-element>

			<tab-element tab="keywords" :title="t('keywords')">
				<block-list
					@add-item="addKeyword"
					@delete-item="deleteKeyword"
					:label-block="t('addKeyword')"
					:items="keywords"
					v-model="inputKeyword"
				></block-list>
			</tab-element>
		</tab-group>

		<div class="settings">
			<header>
				<h2 class="heading-secondary settings-header">
					<icon-settings></icon-settings>
					<span>{{ t('settings') }}</span>
				</h2>
			</header>

			<div class="element-presentation">
				<blocked-content
					kind="post"
					user-tooltip="Chris"
					keyword-tooltip="harvest"
					:post-style="postStyle"
					:lang="lang"
					:withIcons="withIcons"
				></blocked-content>
			</div>

			<div class="settings-list">
				<div class="post-style">
					<label for="post-style-control" class="settings-name">{{ t('postStyle') }}</label>
					<div style="flex: 1">
						<post-style-slider
							id="post-style-control"
							@post-style-changed="style => (postStyle = style)"
							:post-style="postStyle"
						></post-style-slider>
					</div>
				</div>
				<div class="lang">
					<span class="">{{ t('language') }}</span>
					<div class="lang-controls">
						<div>
							<label for="radio-lang-ru">{{ t('ru') }}</label>
							<input id="radio-lang-ru" type="radio" value="ru" v-model="lang" />
						</div>

						<div>
							<label for="radio-lang-en">{{ t('en') }}</label>
							<input id="radio-lang-en" type="radio" value="en" v-model="lang" />
						</div>
					</div>
				</div>
				<div class="with-icons">
					<label for="with-icons-control">{{ t('withIcons') }}</label>
					<input type="checkbox" name="with-icons-control" id="with-icons-control" v-model="withIcons" />
				</div>
			</div>
		</div>
	</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;700&display=swap');

blocked-content {
	font-family: Verdana;
	font-size: 13px;
	transform: translateX(-10px);
}

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

/* === Settings === */

.settings {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 0.5rem 1rem;
	font-size: 1.2rem;
}

.heading-secondary {
	font-weight: 500;
	font-size: 1.4rem;
}

.settings-header {
	display: flex;
	align-items: center;
	gap: 0.4rem;
	margin-top: 0.8rem;
	text-transform: capitalize;
}

.element-presentation {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 135px;
	background-image: linear-gradient(rgb(24, 24, 24), rgb(26, 27, 27) 10%, rgb(26, 27, 27) 80%, rgb(24, 24, 24));
	border-radius: 1rem;
}

.settings-list {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.settings-list > * {
	display: grid;
	grid-template-columns: 8rem 1fr;
	justify-content: start;
}

.lang-controls {
	display: flex;
	gap: 1.2rem;
}

.lang-controls > * {
	display: flex;
	gap: 0.25rem;
	align-items: baseline;
}

.lang-controls label {
	cursor: pointer;
}
</style>
