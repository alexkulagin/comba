'use strict';


//┐  COMBA
//╠──███████████████████████████████████████████████████████████████████████████
//┘


	//┐  USAGE
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		/*
			const { series, parallel } = require('comba');



			// TASK EXAMPLE
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				function callback (ok)
				{
					// execution
					// ...

					ok(); // ok
				}


				// CREATE TASKS (SYNC & ASYNC)
				// ─────────────────────────────────────────────────

					let sync = (n) => (done) => { console.log(n); done() },
						async = (n, t) => (done) => setTimeout(() => { console.log(n); done() }, t);


				// TASKS
				// ─────────────────────────────────────────────────

					let a = async('a', 2400),
						b = async('b', 1200),
						c = sync('c'),
						d = async('d', 2000),
						e = sync('e'),
						f = sync('f');



			// TOTAL COMPLETE CALLBACK
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				let totalComplete = () => console.log('onEnd');



			// EVENT HANDLERS
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				let onRunHandler = () => console.log('onRun'),
					onCompleteHandler = () => console.log('onComplete');



			// SERIES EXECUTION
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				series(a, b, c, d, e, f).run();
				✓ result: a › b › c › d › e › f

				series(a, b, c, d, e, f).run(totalComplete);
				✓ result: a › b › c › d › e › f › onEnd



			// PARALLEL EXECUTION
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				parallel(a, b, c, d, e, f).run();
				✓ result: c › e › f › b › d › a

				parallel(a, b, c, d, e, f).run(totalComplete);
				✓ result: c › e › f › b › d › a › onEnd


				// LIMITED
				// ─────────────────────────────────────────────────

					parallel(a, b, c, d, e, f).limit(1).run();
					✓ result: a › b › c › d › e › f

					parallel(a, b, c, d, e, f).limit(2).run();
					✓ result: b › c › a › e › f › d

					parallel(a, b, c, d, e, f).limit(3).run();
					✓ result: c › b › e › f › d › a

					parallel(a, b, c, d, e, f).limit(4).run();
					✓ result: c › e › f › b › d › a



			// DELAY RUNNING
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				parallel(a, b, c, d, e, f).delay(2000).run();
				✓ result: ⏱ 2s › c › e › f › b › d › a



			// INTERVAL EXECUTION
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				series(a, b, c, d, e, f).interval(100).run();
				✓ result: a › ⏱ 0.1s › b › ⏱ 0.1s › c › ⏱ 0.1s › d › ⏱ 0.1s › e › ⏱ 0.1s › f



			// INSERTING TASKS
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				series(a, b).append(c, d).prepend(e, f).run();
				✓ result: e › f › a › b › c › d



			// PASSING ARRAY
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				let listA = [a, b, [c, d]],
					listB = [e, [a, [d, e]]],
					listC = [d, [e, [a, b]]],
					listD = [d, b];

				series(listA, listB).prepend(listC).append(listD).run(totalComplete);
				✓ result: d › e › a › b › a › b › c › d › e › a › d › e › d › b › onEnd



			// ADD EVENT LISTENERS
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				series(a,b,c,d).interval(1000).delay(3000).on('run', onRunHandler)).on('complete', onCompleteHandler).run(totalComplete);
				✓ result: onRun › ⏱ 3s › a › ⏱ 1s › b › ⏱ 1s › c › ⏱ 1s › d › onComplete › onEnd

		*/



	//┐  UTILS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘


		// IS POSITIVE INTEGER
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const isNum = value => toString.call(value) === '[object Number]' &&  value > 0;


		// IS FUNCTION
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			var isFunction = value => toString.call(value) === '[object Function]';


		// IS ARRAY
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			var isArray = value => Array.isArray(value);


		// HAS OWN KEY
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key);


		// DELAY RUNNING
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const delay = (ƒ, n, ...values) => setTimeout(ƒ, n || 0, ...values);


		// JS OBJECT CREATION
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const getobj = (proto = null, prop) => Object.create(proto, prop);



	//┐  DEFAULT OPTIONS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const __default = getobj();

		__default.parallel = false;
		__default.limit = 0;
		__default.delay = 0;
		__default.interval = 0;




//┐  CONTEXT
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	function Comba (options, ...values)
	{
		options = Object.assign({}, __default, options || {});

		const ctx = getobj();
		ctx.instance = this;

		ctx.parallel = options.parallel;
		ctx.limit = options.limit;
		ctx.delay = options.delay;
		ctx.interval = options.interval;

		ctx.tasks = __prepareTasks(values);

		ctx.results = getobj();

		ctx.running = false;

		ctx.listeners = getobj();
		ctx.listeners.run = null;
		ctx.listeners.complete = null;

		ctx.end = null;


		return __combaInterface(ctx);
	}



	//┐  INTERFACE
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __combaInterface (ctx)
		{

			return Object.defineProperties(ctx.instance,
			{

				// STATS
				// ─────────────────────────────────────────────────

					isRunning: { get: () => ctx.running },


				// PARALLEL LIMITS
				// ─────────────────────────────────────────────────

					limit:
					{
						value: (value) =>
						{
							ctx.limit = (ctx.parallel && isNum(value)) ? value : 0;

							return ctx.instance;
						}
					},


				// DELAY RUNNING
				// ─────────────────────────────────────────────────

					delay:
					{
						value: (value) =>
						{
							ctx.delay = (isNum(value)) ? value : 0;

							return ctx.instance;
						}
					},


				// INTERVAL EXECUTION
				// ─────────────────────────────────────────────────

					interval:
					{
						value: (value) =>
						{
							ctx.interval = (isNum(value)) ? value : 0;

							return ctx.instance;
						}
					},


				// INSERTING TASKS
				// ─────────────────────────────────────────────────

					append:
					{
						value: (...values) =>
						{
							if (values.length) {
								ctx.tasks.push(...__prepareTasks(values));
							}

							return ctx.instance;
						}
					},


					prepend:
					{
						value: (...values) =>
						{
							if (values.length) {
								ctx.tasks.unshift(...__prepareTasks(values));
							}

							return ctx.instance;
						}
					},


				// ADD EVENT LISTENERS
				// ─────────────────────────────────────────────────

					on:
					{
						value: (event, handler) =>
						{
							if (hasOwn(ctx.listeners, event)) {
								ctx.listeners[event] = handler;
							}

							return ctx.instance;
						}
					},


				// RUN PROCESSING
				// ─────────────────────────────────────────────────

					run:
					{
						value: (callback) =>
						{
							if (!ctx.running)
							{
								if (!ctx.tasks.length) {
									// error
								}

								ctx.end = (toString.call(callback) === '[object Function]') ? callback : null;
								ctx.running = true;

								const onRun = ctx.listeners.run;

								if (onRun && isFunction(onRun)) {
									onRun();
								}

								if (ctx.delay) {
									delay(__exec, ctx.delay, ctx);
								}

								else __exec(ctx);
							}

							else return null;
						}
					}
			});
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
				list.push(value);
			}

			else if (isArray(value))
			{
				if (!value.length) {
					// error
				}

				__eachValues(list, ...value);
			}

			return list;
		}


		// EACH VALUES
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			function __eachValues (list, ...values)
			{
				values.forEach(value => __parseValue(value, list));
			}




//┐  TASKS EXECUTION
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	function __exec (ctx)
	{
		ctx.total = ctx.tasks.length;
		ctx.pending = ctx.total;
		ctx.completed = 0;

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
				taskID = 'task_' + index; // temporary dummy

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

			else task(done);
		}



	//┐  COMPLETE
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __complete (ctx, error)
		{
			ctx.running = false;

			if (error) {
				throw new Error ('callback error ' + error);
			}

			const onComplete = ctx.listeners.complete;

			if (onComplete && isFunction(onComplete)) {
				onComplete();
			}

			if (ctx.end !== null) {
				ctx.end(ctx.results);
			}
		}




//┐  CONTEXT
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	const __create = (options, ...values) => new Comba(options, ...values);



	//┐  SERIES EXECUTION
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const __series = (...values) => __create({ parallel: false }, ...values);



	//┐  PARALLEL EXECUTION
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const __parallel = (...values) => __create({ parallel: true }, ...values);




//┐  EXPORTS
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘

	module.exports = { series: __series, parallel: __parallel };


