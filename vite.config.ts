import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.config';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			template: {
				compilerOptions: {
					isCustomElement: (tag: string) => {
						const tags = ['blocked-content', 'my-tab', 'my-tab-group', 'my-tab-panel'];
						return tags.includes(tag);
					},
				},
			},
		}),
		crx({ manifest }),
	],
});
