module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:import/recommended', 'prettier'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'import/extensions': ['error', 'always', { ignorePackages: true }],
	},
	overrides: [
		{
			files: ['**/*.test.js'],
			extends: ['plugin:jest/recommended'],
		},
	],
}
