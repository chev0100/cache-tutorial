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
	},
	init() {
		console.log('APP initialized');
		CACHE.init();
		APP.elements.filename = document.getElementById('filename');
		APP.elements.content = document.getElementById('content');
		APP.elements.filenameDisplay = document.getElementById('filenameDisplay');
		APP.elements.contentDisplay = document.getElementById('contentDisplay');

		APP.elements.warning = document.querySelector('.warning');

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

	saveContent(ev) {
		ev.preventDefault();
		console.log('saveContent');
		console.log(APP.formContent);
		let json = JSON.stringify(APP.formContent);
		let idNum = crypto.randomUUID();
		console.log(idNum);
		let filename = `${APP.formContent.filename}-${idNum}.json`;
		console.log(filename);
		let file = new File([json], filename, { type: 'application/json' });
		console.log(file);

		const response = new Response(file, {
			status: 200,
			statusText: 'File is OK',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': file.size,
				'X-file': file.name,
			},
		});

		let url = new URL(filename, location.origin);

		CACHE.saveInCache(url, response)
			.then(() => {
				console.log('File saved in cache');
				APP.elements.filenameDisplay.textContent = '';
				APP.elements.contentDisplay.textContent = '';
			})
			.catch((err) => {
				console.log(err);
			});
	},
};

document.addEventListener('DOMContentLoaded', APP.init);
