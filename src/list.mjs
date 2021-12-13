'use strict';


//┐  COMBA
//╠──███████████████████████████████████████████████████████████████████████████
//┘


	//┐  IMPORTS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		import CombaTask from './task.mjs';
		import CombaMill from './mill.mjs';

		import { dummy, toDecimal, hasKey, isInt, isFunction, isAsyncFunction, isArray, isPlain, log, error } from './utils.mjs';



	//┐  EVENTS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		import Dispatcher from './event/dispatcher.mjs';
		import Event from './event/events.mjs';		




//┐  CONSTRUCTOR
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	function CombaList (tasks, isSeries)
	{

		const
			list = __make(tasks),
			options = dummy();


		// OPTIONS
		
		options.isSeries = isSeries;

		options.limit = 0;
		options.delay = 0;
		options.interval = 0;

		options.dispatcher = new Dispatcher();


		// INSTANCE
		
		const instance = Object.setPrototypeOf(callback => instance.run(callback), ((!this || !(this instanceof CombaList)) ? dummy() : this));

		instance.constructor = CombaList;


		return __interface(instance, options, list);

	}



	//┐  INTERFACE
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __interface (instance, options, list)
		{

			const { isSeries } = options;


			Object.defineProperties(instance,
			{

				// CHAINABLE METHODS
				// ─────────────────────────────────────────────────

				
					// PARALLEL LIMIT
					// ·············································
					
						limit:
						{
							value: (value) =>
							{
								options.limit = (!isSeries && isInt(value)) ? value : 0;

								return instance;
							}
						},


					// DELAY RUNNING
					// ·············································

						delay:
						{
							value: (value) =>
							{
								options.delay = (isInt(value)) ? value : 0;

								return instance;
							}
						},


					// INTERVAL EXECUTION
					// ·············································

						interval:
						{
							value: (value) =>
							{
								options.interval = toDecimal(value);

								return instance;
							}
						},


					// APPEND TASKS
					// ·············································

						append:
						{
							value: (...values) =>
							{
								if (values && values.length) {
									list.push(...__make(values));
								}

								return instance;
							}
						},


					// PREPEND TASKS
					// ·············································

						prepend:
						{
							value: (...values) =>
							{
								if (values && values.length) {
									list.unshift(...__make(values));
								}

								return instance;
							}
						},


					// EVENT LISTENERS
					// ·············································

						on:
						{
							value: (event, handler) =>
							{
								if (isFunction(handler)) {
									options.dispatcher.on(event, handler);
								}

								return instance;
							}
						},



				// GETTERS
				// ─────────────────────────────────────────────────

				
					// IS LIST
					// ·············································

						isList: { get: () => true },


					// GET TASKS
					// ·············································

						tasks: { get: () => [ ...list ] },


					// GET QUEUE LENGTH
					// ·············································

						length: { get: () => list.length },


					// GET TOTAL TASKS
					// ·············································

						total: { get: () => __total(list) },



				// PRIVATE
				// ─────────────────────────────────────────────────


					// INTERNAL
					// ·············································

						_internal: { value: (ƒ) => ƒ(options, list) },



				// START RUNNING
				// ─────────────────────────────────────────────────

					run:
					{
						value: (onComplete) =>
						{
							if (isFunction(onComplete)) {
								options.dispatcher.on(Event.COMPLETE, onComplete);
							}

							new CombaMill(options, list).exec();
						}
					}
			});



			return instance;
		}



	//┐  LIST MAKER
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const __make = (...values) =>
		{
			const list = [];

			if (!values.length) {
				return list;
			}

			if (values.length === 1) {
				return __prepare(values[0], list);
			}

			return __prepare(values, list);
		};



	//┐  LIST PREPARING
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const __prepare = (values, list) =>
		{

			if (!values) {
				// error
			}


			// PUSH COMBA LIST OR COMBA TASK
			// ─────────────────────────────────────────────────

				if (values.isList || values.isTask) {
					list.push(values);
				}


			// PUSH FUNCTION
			// ─────────────────────────────────────────────────

				else if (isFunction(values) || isAsyncFunction(values)) {
					list.push(new CombaTask(values));
				}


			// EACH ARRAY VALUES
			// ─────────────────────────────────────────────────

				else if (isArray(values))
				{
					if (!values.length) {
						// error
					}

					values.forEach(value => __prepare(value, list));
				}


			// EACH OBJECT KEYS
			// ─────────────────────────────────────────────────

				else if (isPlain(values))
				{
					const keys = Object.keys(values);

					if (!keys.length) {
						// error
					}

					keys.forEach(key => __prepare(values[key], list));
				}


			return list;
		};




	//┐  GET TOTAL TASKS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __total (list)
		{
			let total = 0;

			if (list.length)
			{
				list.forEach(task =>
				{
					if (task.isTask) {
						total += 1;
					}

					else if (task.isList) {
						total += __total(task.tasks);
					}
				});
			}

			return total;
		}




//┐  EXPORTS
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘

	export default CombaList;


