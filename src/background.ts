import { Message } from './types';

const getActiveTab = async () => {
	return chrome.tabs.query({ active: true, lastFocusedWindow: true });
};

chrome.action.onClicked.addListener(() => {
	chrome.runtime.openOptionsPage();
});

chrome.runtime.onMessage.addListener((message: Message) => {
	if (message.type === 'open-options-page') {
		chrome.runtime.openOptionsPage();
	}
});

export {};
