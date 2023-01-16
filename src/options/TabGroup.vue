<script setup lang="ts">
import { useSlots, ref, provide, computed } from 'vue';

const tabElements = useSlots().default?.()!;
const tabTitles = ref<string[]>(tabElements.map(el => el.props?.tab));

const tabProps = computed<{ tab: string; title: string }[]>(() =>
	tabElements.map(el => ({
		tab: el.props?.tab,
		title: el.props?.title,
	}))
);

const selectedTab = ref(tabTitles.value[0]);
provide('selected-tab', selectedTab);
</script>

<template>
	<div class="tab-group">
		<header class="header">
			<ul class="tab-titles-list">
				<li
					:class="{ 'tab-titles-list__item--active': tab === selectedTab }"
					class="tab-titles-list__item"
					@click="selectedTab = tab"
					v-for="({ title, tab }, index) in tabProps"
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
