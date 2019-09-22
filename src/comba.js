'use strict';


//┐  COMBA
//╠──███████████████████████████████████████████████████████████████████████████
//┘


	//┐  IMPORTS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const
			Task = require('./task'),
			Mill = require('./mill');



	//┐  UTILS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const
			setPrototypeOf = require('./h/setPrototypeOf'),
			objectCreate = require('./h/objectCreate'),
			toDecimal = require('./h/toDecimal'),
			prefixCap = require('./h/prefixCap'),
			hasKey = require('./h/hasKey'),

			isInt = require('./h/isInt'),
			isFunction = require('./h/isFunction'),
			isAsyncFunction = require('./h/isAsyncFunction'),
			isArray = require('./h/isArray'),
			isPlain = require('./h/isPlain');



		// DEBUGGING
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const
				log = require('./h/log'),
				error = require('./h/error');




//┐  CONSTRUCTOR
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	function Comba (tasks, isSeries)
	{

		// QUEUE
		
		const queue = __make(tasks);


		// OPTIONS
		
		const options = objectCreate();

		options.isSeries = isSeries;

		options.limit = 0;
		options.delay = 0;
		options.interval = 0;

		options.onRun = null;
		options.onEnd = null;
		options.onComplete = null;


		// INSTANCE
		
		const instance = setPrototypeOf(callback => instance.run(callback), ((!this || !(this instanceof Comba)) ? objectCreate() : this));

		instance.constructor = Comba;


		return __interface(instance, options, queue);

	}




	//┐  INTERFACE
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __interface (instance, options, queue)
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
								if (values.length) {
									queue.push(...__make(values));
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
									queue.unshift(...__make(values));
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
								if (isFunction(handler) && hasKey(options, prefixCap('on', event))) {
									options[event] = handler;
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

						tasks: { get: () => [ ...queue ] },


					// GET QUEUE LENGTH
					// ·············································

						length: { get: () => queue.length },


					// GET TOTAL TASKS
					// ·············································

						size: { get: () => __total(queue) },



				// PRIVATE
				// ─────────────────────────────────────────────────


					// INTERNAL
					// ·············································

						_internal: { value: (ƒ) => ƒ(options, queue) },



				// START RUNNING
				// ─────────────────────────────────────────────────

					run:
					{
						value: (onComplete) =>
						{
							if (isFunction(onComplete)) {
								options.onComplete = onComplete;
							}

							new Mill(options, queue).exec();
						}
					}
			});



			return instance;
		}




	//┐  MAKE TASKS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __make (...values)
		{
			const tasks = [];

			if (!values.length) {
				return tasks;
			}

			if (values.length === 1) {
				return __prepare(values[0], tasks);
			}

			return __prepare(values, tasks);
		}



		// PREPARING
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			function __prepare (values, tasks)
			{

				if (!values) {
					// error
				}


				// PUSH COMBA LIST OR COMBA TASK
				// ─────────────────────────────────────────────────

					if (values.isList || values.isTask) {
						tasks.push(values);
					}


				// PUSH FUNCTION
				// ─────────────────────────────────────────────────

					else if (isFunction(values) || isAsyncFunction(values)) {
						tasks.push(new Task(values));
					}


				// EACH ARRAY VALUES
				// ─────────────────────────────────────────────────

					else if (isArray(values))
					{
						if (!values.length) {
							// error
						}

						values.forEach(value => __prepare(value, tasks));
					}


				// EACH OBJECT KEYS
				// ─────────────────────────────────────────────────

					else if (isPlain(values))
					{
						const keys = Object.keys(values);

						if (!keys.length) {
							// error
						}

						keys.forEach(key => __prepare(values[key], tasks));
					}


				return tasks;
			}




	//┐  GET TOTAL
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __total (queue)
		{
			let total = 0;

			if (queue.length)
			{
				queue.forEach(task =>
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

	module.exports = Object.defineProperties(objectCreate(),
	{

		// SERIES LIST
		// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

			series: {
				get: () => (...values) => new Comba(values, true)
			},


		// PARALLEL LIST
		// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

			parallel: {
				get: () => (...values) => new Comba(values, false)
			}
	});


