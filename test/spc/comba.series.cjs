'use strict';


//┐  COMBA SERIES
//╠──███████████████████████████████████████████████████████████████████████████
//┘


	//┐  COMMONS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const { expect, series, callback } = require('@commons');



	//┐  TYPE CHECKING
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		describe('TYPE CHECKING', () =>
		{
			it('series is function', () => expect(typeof series).to.equal('function'));

			it('series() returns instance of CombaList', () =>
			{
				let list = series();

				expect(list.constructor.name).to.equal('CombaList');
				expect(list).to.not.equal(series());
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


			it('series(a).run()', () =>
			{
				array.length = 0;

				series(a).run();
				expect(array).to.be.equalTo(['a'])
			});


			it('series(a,b,c,d,e).run()', () =>
			{
				array.length = 0;

				series(a,b,c,d,e).run();
				expect(array).to.be.equalTo(['a','b','c','d','e'])
			});


			it('series(e,d,c,b,a).run(complete)', () =>
			{
				array.length = 0;

				series(e,d,c,b,a).run(() => {
					expect(array).to.be.equalTo(['e','d','c','b','a'])
				});
			});


			it('series(a,b,c,d,e)(complete)', () =>
			{
				array.length = 0;

				series(a,b,c,d,e)(() => {
					expect(array).to.be.equalTo(['a','b','c','d','e'])
				});
			});


			it('list(complete)', () =>
			{
				array.length = 0;

				const list = series(e,d,c,b,a);

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


			it('series(a).run(complete)', (next) =>
			{
				array.length = 0;

				series(a).run(() => {
					expect(array).to.be.equalTo(['a']), next()
				});
			});


			it('series(e,d,c,b,a).run(complete)', (next) =>
			{
				array.length = 0;

				series(e,d,c,b,a).run(() => {
					expect(array).to.be.equalTo(['e','d','c','b','a']), next()
				});
			});


			it('series(a,b,c)(complete)', (next) =>
			{
				array.length = 0;

				series(a,b,c)(() => {
					expect(array).to.be.equalTo(['a','b','c']), next()
				});
			});


			it('list(complete)', (next) =>
			{
				array.length = 0;

				const list = series(e,d,c,b,a);

				list(() => {
					expect(array).to.be.equalTo(['e','d','c','b','a']), next()
				});
			});
		});


