<script setup lang="ts">
import { useSlots, ref, provide } from 'vue';

const tabElements = useSlots().default?.()!;
const tabTitles = ref<string[]>(tabElements.map(el => el.props?.title));
const selectedTabTitle = ref(tabTitles.value[0]);
provide('selected-tab-title', selectedTabTitle);
</script>

<template>
	<div class="tab-group">
		<header class="header">
			<ul class="tab-titles-list">
				<li
					:class="{ 'tab-titles-list__item--active': title === selectedTabTitle }"
					class="tab-titles-list__item"
					@click="selectedTabTitle = title"
					v-for="(title, index) in tabTitles"
				>
					{{ title }}
				</li>
			</ul>
		</header>
		<div class="active-tab">
			<slot></slot>
		</div>
	</div>
</template>

<style scoped>
.tab-group {
	max-width: 1200px;
	font-size: 20px;
	/* background-color: red; */
}

.tab-titles-list {
	list-style: none;
	display: flex;
	padding: 0;
	margin-bottom: 10px;
	gap: 10px;
	color: #000;
}

.tab-titles-list__item {
	background-color: #eee;
	padding: 1rem 2rem;
	border-radius: 0.4rem;
	cursor: pointer;
	transition: 0.2s ease-in;
	transition-property: background-color, color, opacity, filter;
}

.tab-titles-list__item--active {
	background-color: #3b82f6;
	color: #fff;
}

.header {
	display: flex;
	gap: 5px;
}
</style>
