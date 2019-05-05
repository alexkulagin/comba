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



			// TASK LIST
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔


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



			// ON COMPLETE HANDLER
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				const onCompleteHandler = () => console.log('on complete');



			// SERIES EXECUTION
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				series(a, b, c, d, e, f).run(); // a › b › c › d › e › f
				series(a, b, c, d, e, f).run(onCompleteHandler); // a › b › c › d › e › f › on complete



			// PARALLEL EXECUTION
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				parallel(a, b, c, d, e, f).run(); // c › e › f › b › d › a
				parallel(a, b, c, d, e, f).run(onCompleteHandler); // c › e › f › b › d › a › on complete


				// LIMITED
				// ─────────────────────────────────────────────────

					parallel(a, b, c, d, e, f).limit(1).run(); // a › b › c › d › e › f
					parallel(a, b, c, d, e, f).limit(2).run(); // b › c › a › e › f › d
					parallel(a, b, c, d, e, f).limit(3).run(); // c › b › e › f › d › a
					parallel(a, b, c, d, e, f).limit(4).run(); // c › e › f › b › d › a



			// DELAY EXECUTION
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				parallel(a, b, c, d, e, f).delay(2000).run(); // sleep 2000ms › c › e › f › b › d › a

		*/



	//┐  UTILS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘


		// CHECK IS POSITIVE INTEGER
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const isNum = value => toString.call(value) === '[object Number]' &&  value > 0;


		// DELAY EXECUTION
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const delay = (ƒ, n, ...values) => setTimeout(ƒ, n || 0, ...values);



	//┐  DEFAULT OPTIONS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const __default = Object.create(null);

		__default.parallel = false;
		__default.limit = 0;
		__default.delay = 0;




//┐  INSTANCE
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	function Comba (options, ...values)
	{
		options = Object.assign({}, __default, options || {});

		const ctx = Object.create(null);

		ctx.parallel = options.parallel;
		ctx.limit = options.limit;
		ctx.delay = options.delay;

		ctx.end = null;

		ctx.running = false;

		ctx.commands = values;
		ctx.instance = this;


		return __combaInterface(ctx);
	}



	//┐  CONTEXT INTERFACE
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __combaInterface (ctx)
		{
			return Object.defineProperties(ctx.instance,
			{
				isRunning: { get: () => ctx.running },

				limit:
				{
					value: (value) =>
					{
						ctx.limit = (ctx.parallel && isNum(value)) ? value : 0;

						return ctx.instance;
					}
				},

				delay:
				{
					value: (value) =>
					{
						ctx.delay = (isNum(value)) ? value : 0;

						return ctx.instance;
					}
				},

				append:
				{
					value: (...values) =>
					{
						if (values.length) {
							ctx.commands.push(...values);
						}

						return ctx.instance;
					}
				},

				prepend:
				{
					value: (...values) =>
					{
						if (values.length) {
							ctx.commands.unshift(...values);
						}

						return ctx.instance;
					}
				},

				run:
				{
					value: (callback) =>
					{
						if (!ctx.running)
						{
							ctx.end = (toString.call(callback) === '[object Function]') ? callback : null;
							ctx.running = true;

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




//┐  EXECUTION
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	function __exec (ctx)
	{
		ctx.total = ctx.commands.length;
		ctx.pending = ctx.total;
		ctx.completed = 0;
		ctx.next = 0;

		if (ctx.parallel)
		{
			ctx.commands.some((value, index) =>
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
			ctx.next = ctx.total - ctx.pending;
			ctx.pending -= 1;

			const command = ctx.commands[ctx.next],

			done = (error) =>
			{
				ctx.completed += 1;

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

			command(done);
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

			if (ctx.end !== null) {
				ctx.end();
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


