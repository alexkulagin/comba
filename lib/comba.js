'use strict';


//┐  COMBA CONTEXT
//╠──███████████████████████████████████████████████████████████████████████████
//┘


	//┐  IMPORTS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const utils = require('./utils');




	//┐  UTILS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const
			__setPrototypeOf = Object.setPrototypeOf,
			__assign = Object.assign,

			__create = utils.create,
			__hasKey = utils.hasKey,
			__delay = utils.delay,

			__isInt = utils.isInt,
			__isArray = utils.isArray,
			__isFunction = utils.isFunction,
			__isTask = utils.isTask,
			__isList = utils.isList;




	//┐  LIST OPTIONS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const __listOptions = __create();

		__listOptions.list = [];
		__listOptions.parallel = false;
		__listOptions.limit = 0;
		__listOptions.delay = 0;
		__listOptions.interval = 0;
		__listOptions.onRun = null;
		__listOptions.onEnd = null;




//┐  COMBA TASK
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	function CombaTask (callback)
	{
		let _instance = __setPrototypeOf((done) => _instance.run(done), this),
			_callback = callback;

		_instance.constructor = CombaTask;



		// LAUNCH TASK
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			Object.defineProperties(_instance,
			{
				run:
				{
					value: (done) =>
					{
						if (!_callback) {
							// error
						}

						_callback(done);
					}
				}
			});



		return _instance;
	}




//┐  COMBA LIST
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	function CombaList (options)
	{
		options = __assign({}, __listOptions, options || {});

		let _instance = __setPrototypeOf((callback) => _instance.run(callback), this),

			_tasks = (options.list.length) ? __prepareTasks(options.list) : options.list,

			_parallel = options.parallel,
			_limit = options.limit,
			_delay = options.delay,
			_interval = options.interval,

			_listeners =
			{
				run: options.onRun,
				end: options.onEnd
			};

		_instance.constructor = CombaList;



		// METHODS
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			Object.defineProperties(_instance,
			{

				// PARALLEL LIMITS
				// ─────────────────────────────────────────────────

					limit:
					{
						value: (value) =>
						{
							_limit = (_parallel && __isInt(value)) ? value : 0;

							return _instance;
						}
					},


				// DELAY RUNNING
				// ─────────────────────────────────────────────────

					delay:
					{
						value: (value) =>
						{
							_delay = (__isInt(value)) ? value : 0;

							return _instance;
						}
					},


				// INTERVAL EXECUTION
				// ─────────────────────────────────────────────────

					interval:
					{
						value: (value) =>
						{
							_interval = (__isInt(value)) ? value : 0;

							return _instance;
						}
					},


				// INSERTING TASKS
				// ─────────────────────────────────────────────────

					append:
					{
						value: (...values) =>
						{
							if (values.length) {
								_tasks.push(...__prepareTasks(values));
							}

							return _instance;
						}
					},


					prepend:
					{
						value: (...values) =>
						{
							if (values.length) {
								_tasks.unshift(...__prepareTasks(values));
							}

							return _instance;
						}
					},


				// ADD EVENT LISTENERS
				// ─────────────────────────────────────────────────

					on:
					{
						value: (event, handler) =>
						{
							if (__isFunction(handler) && __hasKey(_listeners, event)) {
								_listeners[event] = handler;
							}

							return _instance;
						}
					}
			});



		// RUNNER
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const _runner = (callback) =>
			{
				const runner = __create();

				runner.tasks = [..._tasks];
				runner.parallel = _parallel;
				runner.limit = _limit;
				runner.delay = _delay;
				runner.interval = _interval;

				runner.onRun = _listeners.run;
				runner.onEnd = _listeners.end;
				runner.onComplete = (toString.call(callback) === '[object Function]') ? callback : null;

				runner.total = _tasks.length;
				runner.pending = runner.total;
				runner.completed = 0;
				runner.results = __create();

				return runner;
			}



		// LAUNCH RUNNER
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			Object.defineProperties(_instance,
			{
				run:
				{
					value: (callback) =>
					{
						if (!_tasks.length) {
							// error
						}

						const runner = _runner(callback);

						const onRun = runner.onRun;

						if (onRun) {
							onRun();
						}

						if (runner.delay) {
							__delay(__exec, runner.delay, runner);
						}

						else __exec(runner);
					}
				}
			});



		return _instance;
	}




//┐  TASKS PREPARATION
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	function __prepareTasks (values)
	{
		if (!values.length) {
			return values;
		}

		if (values.length === 1) {
			return __parseValue(values[0]);
		}

		return __parseValue(values);
	}



	//┐  PARSING VALUES
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __parseValue (value, list = [])
		{
			if (!value) {
				// error
			}

			if (__isFunction(value)) {
				list.push(new CombaTask(value));
			}

			else if (__isTask(value)) {
				list.push(value);
			}

			else if (__isList(value)) {
				list.push(value);
			}

			else if (__isArray(value))
			{
				if (!value.length) {
					// error
				}

				__eachValues(list, ...value);
			}

			else if (isPlain(value))
			{
				const keys = Object.keys(value);

				if (!keys.length) {
					// error
				}

				__eachKeys(list, keys, value);
			}


			return list;
		}


		// EACH VALUES
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			function __eachValues (list, ...values)
			{
				values.forEach(value => __parseValue(value, list));
			}


		// EACH KEYS
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			function __eachKeys (list, keys, values)
			{
				keys.forEach(key => __parseValue(values[key], list));
			}




//┐  TASKS EXECUTION
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	function __exec (ctx)
	{

		if (ctx.parallel)
		{
			ctx.tasks.some((value, index) =>
			{
				__next(ctx);

				if (ctx.limit && index >= (ctx.limit - 1)) {
					return true;
				}
			});
		}

		else __next(ctx);
	}



	//┐  NEXT
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __next (ctx)
		{
			let index = ctx.total - ctx.pending,
				task = ctx.tasks[index],
				taskID = 'task_' + index, // temporary dummy
				nested = __isList(task);

			ctx.pending -= 1;

			const done = (result = null, error = null) =>
			{
				ctx.completed += 1;


				if (__hasKey(ctx.results, taskID))
				{
					let value = ctx.results[taskID];

					if (!__isArray(value)) {
						value = ctx.results[taskID] = [value];
					}

					value.push(result);
				}

				else ctx.results[taskID] = result;


				if (ctx.total === ctx.completed || error) {
					return __complete(ctx, error);
				}

				if (ctx.parallel && ctx.limit && ctx.pending > 0) {
					return __next(ctx);
				}

				if (!ctx.parallel && ctx.pending > 0) {
					return __next(ctx);
				}
			};

			if (ctx.interval && index > 0) {
				__delay(task, ctx.interval, done);
			}

			else (nested) ? task.run(done) : task(done);
		}



	//┐  TOTAL COMPLETE
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __complete (ctx, error)
		{
			if (error) {
				throw new Error ('callback error ' + error);
			}

			const onEnd = ctx.onEnd;

			if (onEnd) {
				onEnd();
			}

			if (ctx.onComplete !== null) {
				ctx.onComplete(ctx.results);
			}
		}




//┐  CONTEXT
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	const __build = (options) => new CombaList(options);



	//┐  SERIES EXECUTION
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const __series = (...values) => __build({ parallel: false, list: values });



	//┐  PARALLEL EXECUTION
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const __parallel = (...values) => __build({ parallel: true, list: values });




//┐  EXPORTS
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘

	module.exports = Object.defineProperties(__create(),
	{
		series: { get: () => __series },
		parallel: { get: () => __parallel }
	});


