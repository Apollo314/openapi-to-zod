const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	input: {
		type: 'string',
		alias: 'i',
		isRequired: true
	},
	output: {
		type: 'string',
		alias: 'o',
		isRequired: true
	},
	axiosConfig: {
		type: 'string',
		isRequired: false,
		desc: 'axios options as JSON'
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	}
};

const commands = {
	help: { desc: `Print help info` }
};

const helpText = meowHelp({
	name: `openapi-to-zod`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

export default meow(helpText, options);
