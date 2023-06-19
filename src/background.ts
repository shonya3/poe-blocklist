import { Message } from './types';

chrome.action.onClicked.addListener(() => {
	chrome.runtime.openOptionsPage();
});

chrome.runtime.onMessage.addListener((message: Message) => {
	if (message.type === 'open-options-page') {
		chrome.runtime.openOptionsPage();
	}
});

export {};
