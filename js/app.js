import CACHE from './cache.js';

const APP = {
	formContent: {
		filename: '',
		content: '',
	},
	elements: {
		filename: null,
		content: null,
		filenameDisplay: null,
		contentDisplay: null,
		warning: null,
		saveMessage: null,
	},
	init() {
		console.log('APP initialized');
		CACHE.init();
		APP.elements.filename = document.getElementById('filename');
		APP.elements.content = document.getElementById('content');
		APP.elements.filenameDisplay = document.getElementById('filenameDisplay');
		APP.elements.contentDisplay = document.getElementById('contentDisplay');

		APP.elements.warning = document.querySelector('.warning');
		APP.elements.saveMessage = document.querySelector('.saveMessage');

		document
			.getElementById('contentForm')
			.addEventListener('submit', APP.createContent);

		document
			.getElementById('saveContent')
			.addEventListener('click', APP.saveContent);
	},

	createContent(ev) {
		ev.preventDefault();

		if (
			(APP.elements.warning.textContent !== '' &&
				APP.elements.filename.value === '') ||
			APP.elements.content.value === ''
		) {
			APP.elements.warning.textContent = 'Please fill out all fields';
			return;
		}

		APP.formContent.filename = APP.elements.filename.value;
		APP.formContent.content = APP.elements.content.value;

		APP.elements.filename.value = '';
		APP.elements.content.value = '';
		APP.displayContent();
		APP.elements.warning.textContent = '';
	},

	displayContent() {
		console.log(APP.formContent);
		APP.elements.filenameDisplay.textContent = APP.formContent.filename;
		APP.elements.contentDisplay.textContent = APP.formContent.content;
	},

	updateDisplay() {
		APP.elements.filenameDisplay.textContent = '';
		APP.elements.contentDisplay.textContent = '';
		APP.elements.saveMessage.textContent = 'File saved in cache';
		APP.elements.saveMessage.classList.add('success');
	},

	saveContent(ev) {
		ev.preventDefault();
		console.log('saveContent');
		console.log(APP.formContent);
		APP.updateDisplay();
	},
};

document.addEventListener('DOMContentLoaded', APP.init);
