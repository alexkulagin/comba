'use strict';


//┐  COMBA CREATOR
//╠──███████████████████████████████████████████████████████████████████████████
//┘


	//┐  IMPORTS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const
			CombaTask = require('./task'),
			CombaList = require('./list'),

			utils = require('./utils');



	//┐  UTILS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const
			__create = utils.create,

			__isFunction = utils.isFunction,
			__isArray = utils.isArray,
			__isPlain = utils.isPlain,
			__isTask = utils.isTask,
			__isList = utils.isList;




//┐  INTERFACE
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	const __ = __create();



	//┐  MAKE COMBA TASK
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __makeCombatask (value, options)
		{
			return new CombaTask(value, options);
		}



	//┐  MAKE COMBA LIST
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __makeCombalist (options)
		{
			return new CombaList(options);
		}



	//┐  MAKE VALUES
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __makeValues (values)
		{
			const results = [];

			if (!values || !values.length) {
				return results;
			}

			if (values.length === 1) {
				return __prepare(values[0], results);
			}

			return __prepare(values, results);
		}



		// PREPARE LIST VALUE
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			function __prepare (value, results)
			{

				if (!value) {
					// error
				}


				// PUSH FUNCTION
				// ─────────────────────────────────────────────────

					if (__isFunction(value)) {
						results.push(__makeCombatask(value));
					}


				// PUSH COMBA TASK
				// ─────────────────────────────────────────────────

					else if (__isTask(value)) {
						results.push(value);
					}


				// PUSH COMBA LIST
				// ─────────────────────────────────────────────────

					else if (__isList(value)) {
						results.push(value);
					}


				// EACH ARRAY VALUES
				// ─────────────────────────────────────────────────

					else if (__isArray(value))
					{
						if (!value.length) {
							// error
						}

						__eachValues(results, ...value);
					}


				// EACH OBJECT KEYS
				// ─────────────────────────────────────────────────

					else if (__isPlain(value))
					{
						const keys = Object.keys(value);

						if (!keys.length) {
							// error
						}

						__eachKeys(results, keys, value);
					}


				return results;
			}



		// EACH LIST VALUES
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			function __eachValues (results, ...values)
			{
				values.forEach(value => __prepare(value, results));
			}



		// EACH LIST KEYS
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			function __eachKeys (results, keys, values)
			{
				keys.forEach(key => __prepare(values[key], results));
			}




//┐  EXPORTS
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘

	module.exports = Object.defineProperties(__,
	{
		combatask: { value: (value, options) => __makeCombatask(value, options) },
		combalist: { value: (options) => __makeCombalist(options) },
		values: { value: (values) => __makeValues(values) }
	});


