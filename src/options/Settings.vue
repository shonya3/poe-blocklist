<script setup lang="ts"></script>

<template>
	<div class="settings">
		<header>
			<h2 class="heading-secondary settings-header">
				<icon-settings></icon-settings>
				<span>{{ t('settings') }}</span>
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
					:withIcons="withIcons"
				></blocked-content>
			</div>
			<div class="post-style">
				<label for="styleSelect" class="settings-name">{{ t('postStyle') }}</label>
				<div style="flex: 1">
					<post-style-slider
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
		</main>
	</div>
</template>

<style scoped></style>
