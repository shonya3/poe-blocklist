<script setup lang="ts">
import { PostStyle } from '../types';
import { computed, ref } from 'vue';

const sliderInput = ref<HTMLInputElement | null>(null);
const props = defineProps<{
	postStyle: PostStyle;
}>();
const emit = defineEmits<{
	(event: 'post-style-changed', postStyle: PostStyle): void;
}>();

const onInput = (e: Event) => {
	const value = Number((e.target as HTMLInputElement).value);
	emit('post-style-changed', options[value]);
};

const options: PostStyle[] = ['none', 'min', 'strict', 'normal', 'full'];
const postStyleSlider = computed(() => options.findIndex(option => option === props.postStyle));
</script>

<template>
	<input
		ref="sliderInput"
		@input="onInput"
		type="range"
		min="0"
		max="4"
		step="1"
		list="post-style-datalist"
		:value="postStyleSlider"
	/>
	<datalist id="post-style-datalist" style="--list-length: 5">
		<option v-for="option in options">{{ option }}</option>
	</datalist>
</template>

<style scoped>
/* style range */
input[type='range'] {
	width: 100%;
	max-width: 100%;
	margin-left: 0;
}

/* style datalist */
input[type='range'] + datalist {
	display: block;
	margin-top: -4px;
}
input[type='range'] + datalist option {
	display: inline-block;
	width: calc((100% - 12px) / (var(--list-length) - 1));
	text-align: center;
}
input[type='range'] + datalist option:first-child {
	width: calc((100% - 12px) / ((var(--list-length) - 1) * 2) + 6px);
	text-align: left;
}
input[type='range'] + datalist option:last-child {
	width: calc((100% - 12px) / ((var(--list-length) - 1) * 2) + 6px);
	text-align: right;
}

option {
	display: block;
	font-size: 16px;
}
</style>
