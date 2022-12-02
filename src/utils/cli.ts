const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	input: {
		type: 'string',
		alias: 'i',
		desc: 'Either a url to a schema or path to local file',
		isRequired: true
	},
	output: {
		type: 'string',
		alias: 'o',
		desc: 'Output folder, files will be created under here',
		isRequired: true
	},
	axiosConfig: {
		type: 'string',
		isRequired: false,
		desc: 'axios options as JSON'
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	},
	help: {
		type: 'boolean',
		alias: 'h',
		desc: 'show options'
	}
};

const helpText = meowHelp({
	name: `openapi-to-zod`,
	flags,
});

const options = {
	description: "creates zod objects from given openapi schema",
	flags
};

export default meow(helpText, options);
