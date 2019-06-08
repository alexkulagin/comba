'use strict';


//┐  COMBA LIST
//╠──███████████████████████████████████████████████████████████████████████████
//┘


	//┐  IMPORTS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const
			CombaTask = require('./task'),
			CombaExecutor = require('./executor'),
			utils = require('./utils');



	//┐  UTILS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const
			__setPrototypeOf = Object.setPrototypeOf,
			__assign = Object.assign,

			__create = utils.create,
			__hasKey = utils.hasKey,

			__isInt = utils.isInt,
			__isFunction = utils.isFunction;



		// DEBUGGING
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const { log, error, inspect } = utils;



	//┐  DEFAULT OPTIONS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const __options = __create();

		__options.parallel = false;
		__options.limit = 0;

		__options.delay = 0;
		__options.interval = 0;

		__options.onRun = null;
		__options.onEnd = null;

		__options.list = [];




//┐  CONSTRUCTOR
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	function CombaList (options)
	{
		const
			opt = __assign({}, __options, options || __create()),
			ctx = __create();



		// OPTIONS
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			ctx.parallel = opt.parallel;
			ctx.limit = opt.limit;

			ctx.delay = opt.delay;
			ctx.interval = opt.interval;



		// EVENT LISTENERS
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			ctx.listeners = __create();
			ctx.listeners.run = opt.onRun;
			ctx.listeners.end = opt.onEnd;



		// TASKS
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			ctx.tasks = (opt.list.length) ? CombaTask.make(opt.list) : opt.list;



		// INSTANCE
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			ctx.instance = __setPrototypeOf(onComplete => ctx.instance.run(onComplete), this);
			ctx.instance.constructor = CombaList;


		return __interface(ctx);
	}




//┐  INTERFACE
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	function __interface (ctx)
	{

		const
			instance = ctx.instance,
			isParallel = ctx.parallel,
			listeners = ctx.listeners,
			tasks = ctx.tasks;



		// CHAINABLE METHODS
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			Object.defineProperties(instance,
			{

				// PARALLEL LIMIT
				// ─────────────────────────────────────────────────

					limit:
					{
						value: (value) =>
						{
							ctx.limit = (isParallel && __isInt(value)) ? value : 0;

							return instance;
						}
					},


				// DELAY RUNNING
				// ─────────────────────────────────────────────────

					delay:
					{
						value: (value) =>
						{
							ctx.delay = (__isInt(value)) ? value : 0;

							return instance;
						}
					},


				// INTERVAL EXECUTION
				// ─────────────────────────────────────────────────

					interval:
					{
						value: (value) =>
						{
							ctx.interval = (__isInt(value)) ? value : 0;

							return instance;
						}
					},


				// APPEND TASKS
				// ─────────────────────────────────────────────────

					append:
					{
						value: (...values) =>
						{
							if (values.length) {
								tasks.push(...CombaTask.make(values));
							}

							return instance;
						}
					},


				// PREPEND TASKS
				// ─────────────────────────────────────────────────

					prepend:
					{
						value: (...values) =>
						{
							if (values.length) {
								tasks.unshift(...CombaTask.make(values));
							}

							return instance;
						}
					},


				// EVENT LISTENERS
				// ─────────────────────────────────────────────────

					on:
					{
						value: (event, handler) =>
						{
							if (__isFunction(handler) && __hasKey(listeners, event)) {
								listeners[event] = handler;
							}

							return instance;
						}
					}
			});



		// EXECUTION
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			Object.defineProperty(instance, 'run',
			{
				value: (callback) =>
				{
					if (!tasks.length) {
						// error
					}

					new CombaExecutor(ctx, callback).exec();
				}
			});



		return instance;
	}




//┐  EXPORTS
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘

	module.exports = CombaList;


