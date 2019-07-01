'use strict';


//┐  COMBA SERIES
//╠──███████████████████████████████████████████████████████████████████████████
//┘


	//┐  COMMONS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const { expect, parallel, callback } = require('@commons');



	//┐  TYPE CHECKING
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		describe('TYPE CHECKING', () =>
		{
			it('parallel is function', () => expect(typeof parallel).to.equal('function'));

			it('parallel() returns instance of CombaList', () =>
			{
				let list = parallel();

				expect(list.constructor.name).to.equal('CombaList');
				expect(list).to.not.equal(parallel());
			});
		});



	//┐  SYNC EXECUTION
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		describe('SYNC EXECUTION', () =>
		{
			const
				array = [],
				a = callback('a', array),
				b = callback('b', array),
				c = callback('c', array),
				d = callback('d', array),
				e = callback('e', array);


			it('parallel(a).run()', () =>
			{
				array.length = 0;

				parallel(a).run();
				expect(array).to.be.equalTo(['a'])
			});


			it('parallel(a,b,c,d,e).run()', () =>
			{
				array.length = 0;

				parallel(a,b,c,d,e).run();
				expect(array).to.be.equalTo(['a','b','c','d','e'])
			});


			it('parallel(e,d,c,b,a).run(complete)', () =>
			{
				array.length = 0;

				parallel(e,d,c,b,a).run(() => {
					expect(array).to.be.equalTo(['e','d','c','b','a'])
				});
			});


			it('parallel(a,b,c,d,e)(complete)', () =>
			{
				array.length = 0;

				parallel(a,b,c,d,e)(() => {
					expect(array).to.be.equalTo(['a','b','c','d','e'])
				});
			});


			it('list(complete)', () =>
			{
				array.length = 0;

				const list = parallel(e,d,c,b,a);

				list(() => {
					expect(array).to.be.equalTo(['e','d','c','b','a'])
				});
			});
		});



	//┐  ASYNC EXECUTION
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		describe('ASYNC EXECUTION', () =>
		{
			const
				array = [],
				a = callback('a', array, 0),
				b = callback('b', array, 10),
				c = callback('c', array, 20),
				d = callback('d', array, 30),
				e = callback('e', array, 40);


			it('parallel(a).run(complete)', (next) =>
			{
				array.length = 0;

				parallel(a).run(() => {
					expect(array).to.be.equalTo(['a']), next()
				});
			});


			it('parallel(e,d,c,b,a).run(complete)', (next) =>
			{
				array.length = 0;

				parallel(e,d,c,b,a).run(() => {
					expect(array).to.be.equalTo(['a','b','c','d','e']), next()
				});
			});


			it('parallel(a,b,c)(complete)', (next) =>
			{
				array.length = 0;

				parallel(a,b,c)(() => {
					expect(array).to.be.equalTo(['a','b','c']), next()
				});
			});


			it('list(complete)', (next) =>
			{
				array.length = 0;

				const list = parallel(e,d,c,b,a);

				list(() => {
					expect(array).to.be.equalTo(['a','b','c','d','e']), next()
				});
			});
		});


