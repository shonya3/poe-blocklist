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

const moveUp = <T>(A: T[], i: number) => {
	console.log('move up');
	if (i === 0) return;
	[A[i], A[i - 1]] = [A[i - 1], A[i]];
};

const moveDown = <T>(A: T[], i: number) => {
	if (i === A.length - 1) return;
	[A[i + 1], A[i]] = [A[i], A[i + 1]];
};
</script>

<template>
	<div class="blocklist">
		<form class="add-item" @submit.prevent="$emit('add-item', modelValue)">
			<label class="label-block"
				>{{ labelBlock }}
				<input
					required
					type="text"
					:value="modelValue"
					@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
				/>
			</label>
			<button class="icon-btn">
				<icon-plus class="icon icon-plus"></icon-plus>
			</button>
		</form>
		<TransitionGroup tag="ul" name="list" class="blocked-items">
			<li v-for="(item, index) in items" class="blocked-items_item" :key="item">
				<p class="blocked-items_itemname">{{ item }}</p>

				<div class="controls">
					<div class="move-controls">
						<button class="icon-btn" @click="moveUp(items, index)">
							<svg width="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon up">
								<path
									d="M13.64,6.59l7.54,7.54c.91,.91,.91,2.38,0,3.29-.44,.44-1.03,.68-1.64,.68H4.46c-1.28,0-2.32-1.04-2.32-2.32,0-.62,.24-1.21,.68-1.64l7.54-7.54c.91-.91,2.38-.91,3.29,0h0Z"
								></path>
							</svg>
						</button>
						<button class="icon-btn" @click="moveDown(items, index)">
							<svg width="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="down icon">
								<path
									d="M13.64,6.59l7.54,7.54c.91,.91,.91,2.38,0,3.29-.44,.44-1.03,.68-1.64,.68H4.46c-1.28,0-2.32-1.04-2.32-2.32,0-.62,.24-1.21,.68-1.64l7.54-7.54c.91-.91,2.38-.91,3.29,0h0Z"
								></path>
							</svg>
						</button>
					</div>

					<button @click="$emit('delete-item', item)" class="icon-btn">
						<!-- <icon-close class="icon icon-minus"></icon-close> -->
						<svg class="icon" width="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
							<path
								fill="currentColor"
								d="M34.2,30l13.5-13.4c.6-.6,.9-1.4,.9-2.2s-.4-1.5-.9-2c-1.3-1.1-3.2-1.1-4.2,0l-13.5,13.4-13.4-13.5c-.6-.6-1.4-.9-2.2-.9s-1.5,.4-2,.9c-.5,.6-.8,1.3-.8,2.1,0,.9,.3,1.6,.9,2.1l13.3,13.5-13.5,13.4c-.6,.6-.9,1.4-.9,2.2s.4,1.5,.9,2c.6,.5,1.3,.8,2.1,.8s1.6-.3,2.1-.9l13.5-13.3,13.4,13.5c.6,.6,1.3,.9,2.1,.9h.1c.8,0,1.5-.4,2-.9,1.1-1.2,1.1-3.1,.1-4.2l-13.5-13.5Z"
							></path>
						</svg>
					</button>
				</div>
			</li>
		</TransitionGroup>
	</div>
</template>

<style scoped>
.list-move {
	transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.move-controls {
	display: flex;
}
.controls {
	display: flex;
	gap: 0.4rem;
}
.down {
	rotate: 180deg;
}
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
	min-width: 400px;
	margin-top: 1rem;
	padding-inline: 1rem;
	/* outline: 1px solid red; */

	display: flex;
	flex-direction: column;
	gap: 1.2rem;
}

.blocked-items_item {
	display: flex;
	justify-content: space-between;
	align-items: baseline;

	/* border: 1px solid rgba(0, 0, 0, 0.14); */

	padding: 0.5rem 1rem;

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
	font-size: 1rem;
	fill: currentColor;
	transition: all 0.3s ease-out;
}

.icon:hover {
	transform: scale(1.5);
	color: #72634c;
}

.icon-plus {
	color: #72634c;
	font-size: 2.5rem;
}

.icon-btn {
	border: none;
	background: none;
	cursor: pointer;
}

input {
	margin-left: 0.8rem;
	border: 1px solid;
	border-radius: 0.2rem;
	padding: 0.4rem;
	font-size: large;
}
</style>
