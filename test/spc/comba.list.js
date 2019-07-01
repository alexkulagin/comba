'use strict';


//┐  COMBA LIST
//╠──███████████████████████████████████████████████████████████████████████████
//┘


	//┐  COMMONS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const { expect, series, parallel, callback, stay } = require('@commons');



	//┐  LIMITS OF PARALLEL EXECUTION
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		describe('LIMITS OF PARALLEL EXECUTION', () =>
		{
			const
				array = [],
				a = callback('a', array, 10),
				b = callback('b', array, 20),
				c = callback('c', array, 30),
				d = callback('d', array, 15),
				e = callback('e', array, 25);


			it('parallel(a,b,c,d,e).limit(1).run(complete)', (next) =>
			{
				array.length = 0;

				parallel(a,b,c,d,e).limit(1).run(() => {
					expect(array).to.be.equalTo(['a','b','c','d','e']), next()
				});
			});


			it('parallel(a,b,c,d,e).limit(2).run(complete)', (next) =>
			{
				array.length = 0;

				parallel(a,b,c,d,e).limit(2).run(() => {
					expect(array).to.be.equalTo(['a','b','d','c','e']), next()
				});
			});


			it('parallel(a,b,c,d,e).limit(6).run(complete)', (next) =>
			{
				array.length = 0;

				parallel(a,b,c,d,e).limit(6).run(() => {
					expect(array).to.be.equalTo(['a','d','b','e','c']), next()
				});
			});


			it('parallel(a,b,c,d,e).limit(null).run(complete)', (next) =>
			{
				array.length = 0;

				parallel(a,b,c,d,e).limit(null).run(() => {
					expect(array).to.be.equalTo(['a','d','b','e','c']), next()
				});
			});
		});



	//┐  DELAYING RUNS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		describe('DELAYING RUNS', () =>
		{
			const
				array = [],
				a = callback('a', array, 20),
				b = callback('b', array, 10),
				c = callback('c', array, 30),
				d = callback('d', array, 25),
				e = callback('e', array, 15),
				f = callback('f', array);


			it('series(a,b,c,d,e).delay(50).run(complete)', (next) =>
			{
				array.length = 0;

				series(a,b,c,d,e).delay(50).run(() => {
					expect(array).to.be.equalTo(['a','b','c','d','e']), next()
				});

				expect(array.length).to.equal(0);
			});


			it('series(f,a,b,c,d,e).delay(null).run(complete)', (next) =>
			{
				array.length = 0;

				series(f,a,b,c,d,e).delay(null).run(() => {
					expect(array).to.be.equalTo(['f','a','b','c','d','e']), next()
				});

				expect(array.length).to.equal(1);
			});


			it('parallel(a,b,c,d,e).delay(50).run(complete)', (next) =>
			{
				array.length = 0;

				parallel(e,d,c,b,a).delay(50).run(() => {
					expect(array).to.be.equalTo(['b','e','a','d','c']), next()
				});

				expect(array.length).to.equal(0);
			});


			it('parallel(f,a,b,c,d,e).delay(null).run(complete)', (next) =>
			{
				array.length = 0;

				parallel(f,e,d,c,b,a).delay(null).run(() => {
					expect(array).to.be.equalTo(['f','b','e','a','d','c']), next()
				});

				expect(array.length).to.equal(1);
			});
		});



	//┐  INTERVAL OF EXECUTION
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		describe('INTERVAL OF EXECUTION', () =>
		{
			const
				array = [],
				a = callback('a', array, 20),
				b = callback('b', array, 10),
				c = callback('c', array, 30),
				d = callback('d', array, 25),
				e = callback('e', array, 15),
				f = callback('f', array);


			it('series(a,b,c,d,e).interval(100).run(complete)', (next) =>
			{
				array.length = 0;

				series(a,b,c,d,e).interval(100).run(() => {
					expect(array).to.be.equalTo(['a','b','c','d','e']), next()
				});

				// stay(() => expect(array.length).to.equal(0), 0);
				// stay(() => expect(array.length).to.equal(1), 20);
				// stay(() => expect(array.length).to.equal(2), 140);
			});


			it('series(f,a,b,c,d,e).interval(null).run(complete)', (next) =>
			{
				array.length = 0;

				series(f,a,b,c,d,e).interval(null).run(() => {
					expect(array).to.be.equalTo(['f','a','b','c','d','e']), next()
				});

				expect(array.length).to.equal(1);
			});


			it('parallel(a,b,c,d,e).interval(100).run(complete)', (next) =>
			{
				array.length = 0;

				parallel(e,d,c,b,a).interval(100).run(() => {
					expect(array).to.be.equalTo(['e','d','c','b','a']), next()
				});

				// stay(() => expect(array.length).to.equal(0), 0);
				// stay(() => expect(array.length).to.equal(1), 110);
				// stay(() => expect(array.length).to.equal(2), 120);
			});


			it('parallel(f,a,b,c,d,e).interval(null).run(complete)', (next) =>
			{
				array.length = 0;

				parallel(f,e,d,c,b,a).interval(null).run(() => {
					expect(array).to.be.equalTo(['f','b','e','a','d','c']), next()
				});

				expect(array.length).to.equal(1);
			});
		});



	//┐  TASK INSERTING
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		describe('TASK INSERTING', () =>
		{
			const
				array = [],
				a = callback('a', array, 10),
				b = callback('b', array, 20),
				c = callback('c', array, 40),
				d = callback('d', array, 30),
				e = callback('e', array, 25);


			it('series(a,b).append(c,d,e)', (next) =>
			{
				const list = series(a,b).append(c,d,e);

				expect(list.tasks.length).to.equal(5);

				array.length = 0;

				list.run(() => {
					expect(array).to.be.equalTo(['a','b','c','d','e']), next()
				});
			});


			it('parallel(d,e).prepend(a,b,c)', (next) =>
			{
				const list = parallel(d,e).prepend(a,b,c);

				expect(list.tasks.length).to.equal(5);

				array.length = 0;

				list.run(() => {
					expect(array).to.be.equalTo(['a','b','e','d','c']), next()
				});
			});
		});



	//┐  EVENT HANDLING
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		describe('EVENT HANDLING', () =>
		{
			const
				array = [],
				a = callback('a', array, 10),
				b = callback('b', array, 20),
				c = callback('c', array, 40),
				d = callback('d', array, 30),
				e = callback('e', array, 25);


			it('series(a,b,c).on(\'run\',handler).run(complete)', (next) =>
			{
				array.length = 0;

				series(a,b,c).on('run',() => expect(array.length).to.equal(0)).run(() => {
					expect(array).to.be.equalTo(['a','b','c']), next()
				});
			});


			it('parallel(a,c,d,e).on(\'run\',handler).run(complete)', (next) =>
			{
				array.length = 0;

				parallel(a,c,d,e).on('run',() => expect(array.length).to.equal(0)).run(() => {
					expect(array).to.be.equalTo(['a','e','d','c']), next()
				});
			});


			it('series(a,b,c).on(\'end\',handler).run(complete)', (next) =>
			{
				array.length = 0;

				series(a,b,c).on('end',() => expect(array.length).to.equal(3)).run(() => {
					expect(array).to.be.equalTo(['a','b','c']), next()
				});
			});


			it('parallel(a,c,d,e).on(\'end\',handler).run(complete)', (next) =>
			{
				array.length = 0;

				parallel(a,c,d,e).on('end',() => expect(array.length).to.equal(4)).run(() => {
					expect(array).to.be.equalTo(['a','e','d','c']), next()
				});
			});
		});



	//┐  CHAINING
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		describe('CHAINING', () =>
		{
			const
				array = [],
				a = callback('a', array, 10),
				b = callback('b', array, 20),
				c = callback('c', array, 160),
				d = callback('d', array, 80),
				e = callback('e', array, 40),
				f = callback('f', array);


			it(`series(b,c).delay(50).interval(100)
	.append(d,e).prepend(f,a)
	  .on('run',handler).on('end',handler)
	    .run(complete)`, (next) =>
			{
				const list = series(b,c).delay(50).interval(100).append(d,e).prepend(f,a)
					.on('run', () => expect(array.length).to.equal(0))
					.on('end', () => expect(array.length).to.equal(6));

				expect(list.tasks.length).to.equal(6);

				array.length = 0;

				list.run(() => {
					expect(array).to.be.equalTo(['f','a','b','c','d','e']), next()
				});

				expect(array.length).to.equal(0);
			});


			it(`parallel(b,c).delay(50).interval(100)
	.append(d,e).prepend(f,a)
	  .limit(3)
	    .on('run',handler).on('end',handler)
	      .run(complete)`, (next) =>
			{
				const list = parallel(b,c).delay(50).interval(100).append(d,e).prepend(f,a).limit(3)
					.on('run', () => expect(array.length).to.equal(0))
					.on('end', () => expect(array.length).to.equal(6));

				expect(list.tasks.length).to.equal(6);

				array.length = 0;

				list.run(() => {
					expect(array).to.be.equalTo(['f','a','b','e','d','c']), next()
				});

				expect(array.length).to.equal(0);
			});
		});


