


//┐  ROLLUP CONFIG
//╠──███████████████████████████████████████████████████████████████████████████
//┘


	//┐  IMPORTS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		import resolve from 'rollup-plugin-node-resolve'
		import commonjs from 'rollup-plugin-commonjs'
		import replace from 'rollup-plugin-replace'
		import sourcemaps from 'rollup-plugin-sourcemaps'
		import { terser } from 'rollup-plugin-terser'
		import { main } from './package.json'



	//┐  CONSTANTS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const
			IS_DEVELOPMENT = process.env.NODE_ENV === 'development',
			IS_PRODUCTION = !IS_DEVELOPMENT;



	//┐  BUILD CONFIG
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const build =
		{
			input: 'src/comba.js',

			output:
			{
				file: main,
				format: 'umd',
				sourcemap: 'inline',
				name: 'comba'
			},

			plugins:
			[
				resolve({ browser: true }),

				commonjs(),

				replace({
					exclude: [ 'node_modules/**', 'test/**' ],

					IS_DEVELOPMENT: IS_DEVELOPMENT,
					IS_PRODUCTION: IS_PRODUCTION
				}),

				IS_PRODUCTION === true && terser(
				{
					mangle: {
						toplevel: true,
						reserved: ['Comba']
					},

					sourcemap: true
				}),

				sourcemaps()
			]
		};




//┐  EXPORTS
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘

	export default build;


