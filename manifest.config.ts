import { defineManifest, ManifestV3Export } from '@crxjs/vite-plugin';

const manifest: ManifestV3Export = {
	name: 'Path of exile blocklist',
	version: '0.2.7',
	manifest_version: 3,
	permissions: ['storage'],
	description: 'Hide posts from unwanted users on PoE Forum',
	options_page: 'src/options/index.html',
	action: {
		default_title: 'Path of exile blocklist',
	},
	icons: {
		'16': 'src/assets/logo-16x16.png',
		'32': 'src/assets/logo-32x32.png',
		'64': 'src/assets/logo-64x64.png',
		'128': 'src/assets/logo-128x128.png',
	},
	background: {
		service_worker: 'src/background.ts',
		type: 'module',
	},
	content_scripts: [
		{
			js: ['src/content-scripts/main.ts', 'node_modules/@webcomponents/custom-elements/custom-elements.min.js'],
			matches: ['https://*.pathofexile.com/*'],
		},
	],
};
export default defineManifest(manifest);
