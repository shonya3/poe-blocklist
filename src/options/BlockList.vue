<script setup lang="ts">
import IconClose from './icons/IconClose.vue';
import IconPlus from './icons/IconPlus.vue';

defineProps<{
	items: string[];
	modelValue: string;
	labelBlock: string;
}>();
defineEmits<{
	(event: 'add-item', item: string): void;
	(event: 'delete-item', item: string): void;
	(event: 'update:modelValue', value: string): void;
}>();
</script>

<template>
	<div class="blocklist">
		<form class="add-item" @submit.prevent="$emit('add-item', modelValue)">
			<label class="label-block" for="user">{{ labelBlock }}</label>
			<input
				type="text"
				id="user"
				:value="modelValue"
				@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
			/>
			<button class="options-btn">
				<icon-plus class="icon icon-plus"></icon-plus>
			</button>
		</form>
		<ul class="blocked-items">
			<li v-for="item in items" class="blocked-items_item">
				<p class="blocked-items_itemname">{{ item }}</p>
				<button @click="$emit('delete-item', item)" class="options-btn">
					<icon-close class="icon icon-minus"></icon-close>
				</button>
			</li>
		</ul>
	</div>
</template>

<style scoped>
.blocklist {
	min-width: 32rem;
	padding: 0.5rem 1rem;

	display: flex;
	flex-direction: column;
	align-items: center;
}

form.add-item {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;
}

.label-block {
	font-weight: 400;
	font-size: 1.4rem;
}

.label-block::first-letter {
	text-transform: capitalize;
}

.blocked-items {
	max-width: 80%;
	min-width: 400px;
	/* margin: 0 auto; */
	margin-top: 2rem;
	padding: 1rem 3rem;

	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.blocked-items_item {
	display: flex;
	justify-content: space-between;
	align-items: center;

	padding: 0.5rem 3rem;

	line-height: 2rem;

	border-radius: 0.1rem;

	box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 3px 3px hsl(0deg 0% 0% / 0.075),
		0 4px 4px hsl(0deg 0% 0% / 0.075);
}

.blocked-items_item:hover {
	background-color: hsl(0, 14%, 99%);
}

.blocked-items_itermname {
	font-size: 1.5rem;
}

.icon {
	font-size: 1.5rem;
	color: #374151;
	transition: all 0.3s ease-out;
}

.icon:hover {
	transform: scale(1.5);
}

.icon-plus {
	color: #72634c;
	font-size: 2.5rem;
}

.icon-minus:hover {
	color: #72634c;
}

.options-btn {
	border: none;
	background: none;
	cursor: pointer;
	padding: 0.4rem;
}

input {
	border: 1px solid;
	border-radius: 0.2rem;
	/* height: 1.5rem; */
	padding: 0.4rem;
	font-size: large;
}
</style>
