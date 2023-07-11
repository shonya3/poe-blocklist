import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.config';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 5173,
		strictPort: true,
		hmr: {
			port: 5173,
		},
	},
	plugins: [
		vue({
			template: {
				compilerOptions: {
					isCustomElement: (tag: string) => {
						const tags = ['blocked-content', 'my-tab', 'my-tab-group', 'my-tab-panel', 'theme-toggle'];
						return tags.includes(tag);
					},
				},
			},
		}),
		crx({ manifest }),
    ],
});
