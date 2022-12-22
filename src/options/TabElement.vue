<script setup lang="ts">
import { inject } from 'vue';

defineProps<{ title: string }>();

const selectedTitle = inject('selected-tab-title');
</script>

<template>
	<div v-show="selectedTitle === title" class="tab">
		<slot></slot>
	</div>
</template>

<style scoped></style>
