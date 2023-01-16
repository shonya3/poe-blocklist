<script setup lang="ts">
import { inject } from 'vue';

defineProps<{ title: string; tab: string }>();

const selectedTab = inject('selected-tab');
</script>

<template>
	<div v-show="selectedTab === tab" class="tab">
		<slot></slot>
	</div>
</template>

<style scoped></style>
