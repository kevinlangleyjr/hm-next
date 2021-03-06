module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	env: {
		browser: true,
		amd: true,
		node: true,
	},
	extends: [
		'@humanmade/eslint-config',
	],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'jsx-a11y/anchor-is-valid': [
			'error',
			{
				components: [ 'Link' ],
				specialLink: [ 'hrefLeft', 'hrefRight' ],
				aspects: [ 'invalidHref', 'preferButton' ],
			},
		],
	},
};
