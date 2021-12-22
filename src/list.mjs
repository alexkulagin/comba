'use strict';


//┐  COMBA LIST
//╠──███████████████████████████████████████████████████████████████████████████
//┘


	//┐  IMPORTS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		import CombaTask from './task.mjs';
		import CombaRunner from './runner.mjs';

		import { dummy, toDecimal, hasKey, isInt, isFunction, isAsyncFunction, isArray, isObject, isPlainObject, log } from './utils.mjs';



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


	function CombaList (tasks, isParallel)
	{
		// INSTANCE
		
		const instance = Object.setPrototypeOf((callback, scope) => instance.run(callback, scope), ((!this || !(this instanceof CombaList)) ? dummy() : this));
		instance.constructor = CombaList;


		return __interface(instance, tasks, isParallel);

	}



	//┐  INTERFACE
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __interface (instance, tasks, isParallel = false)
		{

			const
				list = __make(tasks),

				$events = dummy();
				$events.run = null;
				$events.end = null;
				$events.done = null;
				$events.complete = null;


			let	$isParallel = isParallel,
				$limit = 0,
				$delay = 0,
				$interval = 0;


			Object.defineProperties(instance,
			{

				// props = (!!props && isObject(props)) ? { ...defaultOptions, ...props } : defaultOptions;

				// CHAINABLE METHODS
				// ─────────────────────────────────────────────────

				
					// SCOPE OBJECT
					// ·············································
					
						/*scope:
						{
							value: (target) =>
							{
								$scope = (!!target && isPlainObject(target)) ? target : $scope;

								return instance;
							}
						},*/

				
					// PARALLEL LIMIT
					// ·············································
					
						limit:
						{
							value: (value) =>
							{
								$limit = ($isParallel && isInt(value)) ? value : $limit;

								return instance;
							}
						},


					// DELAY RUNNING
					// ·············································

						delay:
						{
							value: (value) =>
							{
								$delay = (isInt(value)) ? value : 0;

								return instance;
							}
						},


					// INTERVAL EXECUTION
					// ·············································

						interval:
						{
							value: (value) =>
							{
								$interval = toDecimal(value);

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
								if (!!event && !!handler && hasKey($events, event) && isFunction(handler)) {
									$events[event] = handler;
								}

								return instance;
							}
						},



				// GETTERS
				// ─────────────────────────────────────────────────

				
					// IS LIST
					// ·············································

						isList: { get: () => true },


					// TASKS
					// ·············································

						tasks: { get: () => [ ...list ] },


					// LIST LENGTH
					// ·············································

						length: { get: () => list.length },


					// TOTAL TASKS
					// ·············································

						total: { get: () => __total(list) },



				// PRIVATE
				// ─────────────────────────────────────────────────


					// INTERNAL
					// ·············································

						_internal: { value: (ƒ) => ƒ(/*options, */list, instance) },



				// START RUNNING
				// ─────────────────────────────────────────────────

					run:
					{
						value: (onComplete, scope = null) =>
						{
							if (!!onComplete && isFunction(onComplete)) {
								$events.complete = onComplete;

							}

							const props = dummy();

							props.scope = (!!scope && isPlainObject(scope)) ? scope : dummy();

							props.events = $events;

							props.isParallel = $isParallel;
							props.limit = $limit;
							props.delay = $delay;
							props.interval = $interval;

							new CombaRunner(list, props).run();
						}
					}
			});



			return instance;
		}




//┐  UTILS
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	//┐  TOTAL TASKS
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



	//┐  CREATE LIST
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

				else if (isPlainObject(values))
				{
					const keys = Object.keys(values);

					if (!keys.length) {
						// error
					}

					keys.forEach(key => __prepare(values[key], list));
				}


			return list;
		};




//┐  EXPORTS
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘

	export default CombaList;


