'use strict';


//┐  COMBA MILL
//╠──███████████████████████████████████████████████████████████████████████████
//┘


	//┐  UTILS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const
			setPrototypeOf = require('./h/setPrototypeOf'),
			objectCreate = require('./h/objectCreate'),
			delay = require('./h/delay');



		// DEBUGGING
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const
				log = require('./h/log'),
				error = require('./h/error');




//┐  CONSTRUCTOR
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


<<<<<<< HEAD:src/mill.js
	function Mill (options, queue)
=======
	function CombaMill (combalist, callback)
>>>>>>> 88eb21d79e11ce64ea7ac6fc608634eb1df3dbcf:lib/mill.js
	{

		const ctx = Object.assign(objectCreate(), options);


<<<<<<< HEAD:src/mill.js
		// PROPERTIES
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			ctx.total = queue.length;
			ctx.pending = ctx.total;
			ctx.completed = 0;
=======

		// QUEUE OF TASKS
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			ctx.queue = [...combalist.queue];
>>>>>>> 88eb21d79e11ce64ea7ac6fc608634eb1df3dbcf:lib/mill.js



		// QUEUE OF TASKS
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

<<<<<<< HEAD:src/mill.js
			ctx.queue = [ ...queue ];
=======
			ctx.total = ctx.queue.length;
			ctx.pending = ctx.total;
			ctx.completed = 0;
>>>>>>> 88eb21d79e11ce64ea7ac6fc608634eb1df3dbcf:lib/mill.js



		// INSTANCE
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

<<<<<<< HEAD:src/mill.js
			ctx.instance = setPrototypeOf(() => ctx.instance.exec(), this);
			ctx.instance.constructor = Mill;
=======
			ctx.instance = __setPrototypeOf(() => ctx.instance.exec(), this);
			ctx.instance.constructor = CombaMill;
>>>>>>> 88eb21d79e11ce64ea7ac6fc608634eb1df3dbcf:lib/mill.js


		return __interface(ctx);
	}




//┐  INTERFACE
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	function __interface (ctx)
	{

		const instance = ctx.instance;



		// CHAINABLE METHODS
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			Object.defineProperties(instance, {});



		// EXECUTION
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			Object.defineProperty(instance, 'exec',
			{
				value: () =>
				{
<<<<<<< HEAD:src/mill.js
=======
					if (!ctx.queue.length) {
						// error
					}

>>>>>>> 88eb21d79e11ce64ea7ac6fc608634eb1df3dbcf:lib/mill.js
					if (ctx.onRun) {
						ctx.onRun();
					}

					if (ctx.delay) {
						delay(__exec, ctx.delay, ctx);
					}

					else __exec(ctx);
				}
			});


		return instance;
	}




//┐  EXECUTION
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	function __exec (ctx)
	{
		if (ctx.isSeries === false)
		{
			ctx.queue.some((value, index) =>
			{
				if (ctx.interval && index > 0) {
<<<<<<< HEAD:src/mill.js
					delay(__next, ctx.interval * index, ctx);
=======
					__delay(__next, ctx.interval * index, ctx);
>>>>>>> 88eb21d79e11ce64ea7ac6fc608634eb1df3dbcf:lib/mill.js
				}

				else __next(ctx);

				if (ctx.limit && index >= (ctx.limit - 1)) {
					return true;
				}
			});
		}

		else __next(ctx);
	}



	//┐  NEXT TASK
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __next (ctx)
		{
			let index = ctx.total - ctx.pending,
				target = ctx.queue[index],
				targetID = 'target_' + index; // temporary dummy

			ctx.pending -= 1;

			const done = (error = null) =>
			{
				ctx.completed += 1;

				if (ctx.total === ctx.completed || error) {
					return __complete(ctx, error);
				}


<<<<<<< HEAD:src/mill.js
				if (ctx.pending > 0 && (ctx.isSeries || !ctx.isSeries && ctx.limit > 0 && ctx.limit < ctx.total))
				{
					if (ctx.interval) {
						return delay(__next, ctx.interval, ctx);
=======
				if (ctx.pending > 0 && (!ctx.parallel || ctx.parallel && ctx.limit > 0 && ctx.limit < ctx.total))
				{
					if (ctx.interval) {
						return __delay(__next, ctx.interval, ctx);
>>>>>>> 88eb21d79e11ce64ea7ac6fc608634eb1df3dbcf:lib/mill.js
					}

					else return __next(ctx);
				}
			};


			target.run(done);
		}



	//┐  COMPLETE
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘
<<<<<<< HEAD:src/mill.js

		function __complete (ctx, error)
		{
			if (error) {
				throw new Error ('callback error ' + error);
			}

			if (ctx.onEnd) {
				ctx.onEnd();
			}

			if (ctx.onComplete) {
=======

		function __complete (ctx, error)
		{
			if (error) {
				throw new Error ('callback error ' + error);
			}

			if (ctx.onEnd) {
				ctx.onEnd();
			}

			if (ctx.onComplete !== null) {
>>>>>>> 88eb21d79e11ce64ea7ac6fc608634eb1df3dbcf:lib/mill.js
				ctx.onComplete();
			}
		}




//┐  EXPORTS
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘

<<<<<<< HEAD:src/mill.js
	module.exports = Mill;
=======
	module.exports = CombaMill;
>>>>>>> 88eb21d79e11ce64ea7ac6fc608634eb1df3dbcf:lib/mill.js


