'use strict';


//┐  COMBA
//╠──███████████████████████████████████████████████████████████████████████████
//┘


	//┐  IMPORTS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		import CombaTask from './task.mjs';
		import CombaMill from './mill.mjs';

		import { dummy, toDecimal, hasKey, isInt, isFunction, isAsyncFunction, isArray, isObject, isPlain, log } from './utils.mjs';



	//┐  EVENTS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		import Dispatcher from './event/dispatcher.mjs';
		import Event from './event/events.mjs';



	//┐  DEFAULT OPTIONS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		/*const defaultOptions =
		{
			isParallel: null,
			limit: 0,
			delay: 0,
			interval: 0,

			tasks: null
		};*/




//┐  CONSTRUCTOR
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	function CombaList (tasks, isParallel = false)
	{
		// INSTANCE
		
		const instance = Object.setPrototypeOf(callback => instance.run(callback), ((!this || !(this instanceof CombaList)) ? dummy() : this));
		instance.constructor = CombaList;


		return __interface(instance, tasks, isParallel);

	}



	//┐  INTERFACE
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __interface (instance, tasks, isParallel)
		{

			// options = (!!options && isObject(options)) ? { ...defaultOptions, ...options } : defaultOptions;

			const list = __make(tasks);
			const dispatcher = new Dispatcher();
			const props = dummy();


			props.isParallel = isParallel;
			props.limit = 0;
			props.delay = 0;
			props.interval = 0;


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
								props.limit = (isParallel && isInt(value)) ? value : props.limit;

								return instance;
							}
						},


					// DELAY RUNNING
					// ·············································

						delay:
						{
							value: (value) =>
							{
								props.delay = (isInt(value)) ? value : 0;

								return instance;
							}
						},


					// INTERVAL EXECUTION
					// ·············································

						interval:
						{
							value: (value) =>
							{
								props.interval = toDecimal(value);

								return instance;
							}
						},


					// APPEND TASKS
					// ·············································

						append:
						{
							value: (...values) =>
							{
								if (values.length) {
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
								if (values.length) {
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
									dispatcher.on(event, handler);
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

						_internal: { value: (ƒ) => ƒ(/*options, */list, instance, dispatcher) },



				// START RUNNING
				// ─────────────────────────────────────────────────

					run:
					{
						value: (onComplete) =>
						{
							if (isFunction(onComplete)) {
								dispatcher.on(Event.COMPLETE, onComplete);
							}

							new CombaMill(list, dispatcher, props).run();
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


