'use strict';


//┐  COMBA
//╠──███████████████████████████████████████████████████████████████████████████
//┘


	//┐  UTILS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘


		// HAS OWN KEY
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key);


		// DELAY RUNNING
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const delay = (ƒ, n, ...values) => setTimeout(ƒ, n || 0, ...values);


		// JS OBJECT CREATION
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const getobj = (proto = null, prop) => Object.create(proto, prop);


		// IS POSITIVE INTEGER
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const isNum = value => toString.call(value) === '[object Number]' &&  value > 0;


		// IS FUNCTION
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const isFunction = value => toString.call(value) === '[object Function]';


		// IS COMBA LIST
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const isList = value => toString.call(value) === '[object Object]' && value.constructor === CombaList;


		// IS COMBA TASK
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const isTask = value => toString.call(value) === '[object Object]' && value.constructor === CombaTask;


		// IS ARRAY
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const isArray = value => Array.isArray(value);


		// IS PLAIN
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const isPlain = (value) =>
			{
				if (!value || toString.call(value) !== '[object Object]') {
					return false;
				}

				const proto = Object.getPrototypeOf(value);

				if (!proto) {
					return true;
				}

				const ƒ = hasOwn(proto, 'constructor') && proto.constructor;

				return typeof ƒ === 'function' && ƒ instanceof ƒ && Function.prototype.toString.call(ƒ) === Function.prototype.toString.call(Object);
			}



	//┐  LIST OPTIONS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const __listOptions = getobj();

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
		let _instance = Object.setPrototypeOf((done) => _instance.run(done), this),
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
		options = Object.assign({}, __listOptions, options || {});

		let _instance = Object.setPrototypeOf((callback) => _instance.run(callback), this),

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
							_limit = (_parallel && isNum(value)) ? value : 0;

							return _instance;
						}
					},


				// DELAY RUNNING
				// ─────────────────────────────────────────────────

					delay:
					{
						value: (value) =>
						{
							_delay = (isNum(value)) ? value : 0;

							return _instance;
						}
					},


				// INTERVAL EXECUTION
				// ─────────────────────────────────────────────────

					interval:
					{
						value: (value) =>
						{
							_interval = (isNum(value)) ? value : 0;

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
							if (isFunction(handler) && hasOwn(_listeners, event)) {
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
				const runner = getobj();

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
				runner.results = getobj();

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
							delay(__exec, runner.delay, runner);
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

			if (isFunction(value)) {
				list.push(new CombaTask(value));
			}

			else if (isTask(value)) {
				list.push(value);
			}

			else if (isList(value)) {
				list.push(value);
			}

			else if (isArray(value))
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
				nested = isList(task);

			ctx.pending -= 1;

			const done = (result = null, error = null) =>
			{
				ctx.completed += 1;


				if (hasOwn(ctx.results, taskID))
				{
					let value = ctx.results[taskID];

					if (!isArray(value)) {
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
				delay(task, ctx.interval, done);
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


	const __create = (options) => new CombaList(options);



	//┐  SERIES EXECUTION
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const __series = (...values) => __create({ parallel: false, list: values });



	//┐  PARALLEL EXECUTION
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const __parallel = (...values) => __create({ parallel: true, list: values });




//┐  EXPORTS
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘

	module.exports = Object.defineProperties(getobj(),
	{
		series: { get: () => __series },
		parallel: { get: () => __parallel }
	});


