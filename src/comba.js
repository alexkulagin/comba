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
			isPlain = require('./h/isPlain'),
			isCombaList = require('./h/isCombaList'),
			isCombaTask = require('./h/isCombaTask');



		// DEBUGGING
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const
				log = require('./h/log'),
				error = require('./h/error');



	//┐  DEFAULT OPTIONS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const
			defaults = objectCreate();

			defaults.queue = [];

			defaults.serial = true;

			defaults.limit = 0;
			defaults.delay = 0;
			defaults.interval = 0;

			defaults.onRun = null;
			defaults.onEnd = null;
			defaults.onComplete = null;




//┐  CONSTRUCTOR
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	function Comba (options)
	{
		const instance = (!this || !(this instanceof Comba)) ? objectCreate() : this;

		if (options)
		{
			if (options.queue && options.queue.length) {
				options.queue = __makeList(options.queue);
			}
		}

		else options = objectCreate();

		const ctx = Object.assign(objectCreate(), defaults, options);

		ctx.instance = setPrototypeOf(onComplete => ctx.instance.run(onComplete), instance);
		ctx.instance.constructor = Comba;


		return __interface(ctx);
	}



	//┐  COMBA INTERFACE
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __interface (ctx)
		{

			const { instance, serial, queue } = ctx;



			// CHAINABLE METHODS
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				Object.defineProperties(instance,
				{

					// PARALLEL LIMIT
					// ·············································

						limit:
						{
							value: (value) =>
							{
								ctx.limit = (!serial && isInt(value)) ? value : 0;

								return instance;
							}
						},


					// DELAY RUNNING
					// ·············································

						delay:
						{
							value: (value) =>
							{
								ctx.delay = (isInt(value)) ? value : 0;

								return instance;
							}
						},


					// INTERVAL EXECUTION
					// ·············································

						interval:
						{
							value: (value) =>
							{
								ctx.interval = toDecimal(value);

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
									queue.push(...__makeList(values));
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
									queue.unshift(...__makeList(values));
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
								if (isFunction(handler) && hasKey(ctx, prefixCap('on', event))) {
									ctx[event] = handler;
								}

								return instance;
							}
						}
				});



			// GETTERS
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				Object.defineProperties(instance,
				{

					// GET TASKS
					// ·············································

						tasks: { get: () => [ ...queue ] }
				});



			// EXECUTION
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				Object.defineProperty(instance, 'run',
				{
					value: (onComplete) =>
					{
						if (isFunction(onComplete)) {
							ctx.onComplete = onComplete;
						}

						new Mill(ctx).exec();
					}
				});



			return instance;
		}



	//┐  PUBLIC STATIC
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		Object.defineProperties(Comba,
		{

			// SERIES LIST
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				series: {
					get: () => (...values) => new Comba({ serial: true, queue: values })
				},


			// PARALLEL LIST
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				parallel: {
					get: () => (...values) => new Comba({ serial: false, queue: values })
				}
		});



	//┐  TASKLIST MAKER
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __makeList (...values)
		{
			const tasks = [];

			if (!values.length) {
				return tasks;
			}

			if (values.length === 1) {
				return __prepareTasks(values[0], tasks);
			}

			return __prepareTasks(values, tasks);
		}



		// PREPARE TASKLIST
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			function __prepareTasks (values, tasks)
			{

				if (!values) {
					// error
				}


				// PUSH FUNCTION
				// ─────────────────────────────────────────────────

					if (isFunction(values) || isAsyncFunction(values)) {
						tasks.push(new Task(values));
					}


				// PUSH COMBA TASK
				// ─────────────────────────────────────────────────

					else if (isCombaTask(values)) {
						tasks.push(values);
					}


				// PUSH COMBA LIST
				// ─────────────────────────────────────────────────

					else if (isCombaList(values)) {
						tasks.push(values);
					}


				// EACH ARRAY VALUES
				// ─────────────────────────────────────────────────

					else if (isArray(values))
					{
						if (!values.length) {
							// error
						}

						values.forEach(value => __prepareTasks(value, tasks));
					}


				// EACH OBJECT KEYS
				// ─────────────────────────────────────────────────

					else if (isPlain(values))
					{
						const keys = Object.keys(values);

						if (!keys.length) {
							// error
						}

						keys.forEach(key => __prepareTasks(values[key], tasks));
					}


				return tasks;
			}




//┐  EXPORTS
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘

	module.exports = Comba;


