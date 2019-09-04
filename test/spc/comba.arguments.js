'use strict';


//┐  COMBA ARGUMENTS
//╠──███████████████████████████████████████████████████████████████████████████
//┘


	//┐  COMMONS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const { expect, comba, series, parallel, callback, stay } = require('@commons');



	//┐  TYPE CHECKING
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		describe('TYPE CHECKING', () =>
		{
			it('comba.series is function', () => expect(typeof comba.series).to.equal('function'));

			it('comba.parallel is function', () => expect(typeof comba.parallel).to.equal('function'));

			it('comba is function', () => expect(typeof comba).to.equal('function'));

			it('comba() returns instance of Comba', () =>
			{
				let list = comba();

				expect(list.constructor.name).to.equal('Comba');
				expect(list).to.not.equal(comba());
			});
		});



	//┐  OPTIONS CHECKING
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		describe('OPTIONS CHECKING', () =>
		{
			const
				array = [],
				a = callback('a', array, 0),
				b = callback('b', array, 20),
				c = callback('c', array, 10),
				d = callback('d', array, 40),
				e = callback('e', array, 30);


			it('comba({queue:[a,b,c,d,e]}) is type of series', (next) =>
			{
				array.length = 0;

				comba({queue:[a,b,c,d,e]}).run(() => {
					expect(array).to.be.equalTo(['a','b','c','d','e']), next()
				});
			});


			it('comba({queue:[a,b,c,d,e],serial:false}) is type of parallel', (next) =>
			{
				array.length = 0;

				comba({queue:[a,b,c,d,e],serial:false}).run(() => {
					expect(array).to.be.equalTo(['a','c','b','e','d']), next()
				});
			});


			it('comba({queue:[a,b,c,d,e],serial:false,limit:2}).run(complete)', (next) =>
			{
				array.length = 0;

				comba({queue:[a,b,c,d,e],serial:false,limit:1}).run(() => {
					expect(array).to.be.equalTo(['a','b','c','d','e']), next()
				});
			});


			it('comba({queue:[a,b,c,d,e],delay:50}).run(complete)', (next) =>
			{
				array.length = 0;

				comba({queue:[a,b,c,d,e],delay:50}).run(() => {
					expect(array).to.be.equalTo(['a','b','c','d','e']), next()
				});

				expect(array.length).to.equal(0);
				stay(() => expect(array.length).to.not.equal(0), 60);
			});


			it('comba({queue:[a,b,c,d,e],interval:100}).run(complete)', (next) =>
			{
				array.length = 0;

				comba({queue:[a,b,c,d,e],interval:100}).run(() => {
					expect(array).to.be.equalTo(['a','b','c','d','e']), next()
				});

				expect(array.length).to.equal(0);
				stay(() => expect(array.length).to.not.equal(0), 120);
			});


			it('comba({queue:[a,b,c,d,e],onRun:handler}).run(complete)', (next) =>
			{
				array.length = 0;

				comba({queue:[a,b,c,d,e],onRun:() => expect(array.length).to.equal(0)}).run(() => {
					expect(array).to.be.equalTo(['a','b','c','d','e']), next()
				});
			});


			it('comba({queue:[a,b,c,d,e],onEnd:handler}).run(complete)', (next) =>
			{
				array.length = 0;

				comba({queue:[a,b,c,d,e],onEnd:() => expect(array.length).to.equal(5)}).run(() => {
					expect(array).to.be.equalTo(['a','b','c','d','e']), next()
				});
			});


			it('comba({queue:[a,e,c,d,b],onComplete:handler}).run()', (next) =>
			{
				array.length = 0;

				comba({queue:[a,e,c,d,b],onComplete:() => {
						expect(array).to.be.equalTo(['a','e','c','d','b']),
						expect(array.length).to.equal(5), next()
				}}).run();
			});
		});



	//┐  PASSING TASKS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		describe('PASSING TASKS', () =>
		{
			const
				array = [],

				// sync
				a = callback('a', array),
				b = callback('b', array),
				c = callback('c', array),
				d = callback('d', array),
				e = callback('e', array),

				// async
				g = callback('g', array, 0),
				m = callback('m', array, 20),
				n = callback('n', array, 10),
				o = callback('o', array, 40),
				p = callback('p', array, 30),

				// arrays
				A1 = [a, b, c, d, e],
				A2 = [g, m, n, o, p],
				A3 = [b, e, n, c, m],

				// objects
				O1 = { a: a, b: b, c: c, d: d, e: e },
				O2 = { g: g, m: m, n: n, o: o, p: p },
				O3 = { b: b, e: e, n: n, c: c, m: m },

				// lists
				S1 = series(A1, A2, O3).interval(40),
				S2 = series(A3, O1, O2).delay(100),
				P1 = parallel(A1, A2, O3).delay(200).interval(50),
				P2 = parallel(A3, S2, S1).limit(2),

				// groups
				G1 = [a, b, A1, [c, P2], S2, O3],
				G2 = [n, S1, P1, [O3, A2], g, o, G1];


			it('series(A1)', (next) =>
			{
				array.length = 0;

				series(A1).run(() => {
					expect(array.length).to.equal(5), next()
				});
			});


			it('series(A2,A3)', (next) =>
			{
				array.length = 0;

				series(A2,A3).run(() => {
					expect(array.length).to.equal(10), next()
				});
			});


			it('series(A2,o,g,O3)', (next) =>
			{
				array.length = 0;

				series(A2,o,g,O3).run(() => {
					expect(array.length).to.equal(12), next()
				});
			});


			it('parallel(a,b,O1,O2,c,m)', (next) =>
			{
				array.length = 0;

				parallel(a,b,O1,O2,c,m).run(() => {
					expect(array.length).to.equal(14), next()
				});
			});


			it('parallel(S1,S2,O1,O3)', (next) =>
			{
				array.length = 0;

				parallel(S1,S2,O1,O3).run(() => {
					expect(array.length).to.equal(40), next()
				});
			});


			it('series(P1,g,m,P2)', (next) =>
			{
				array.length = 0;

				series(P1,g,m,P2).run(() => {
					expect(array.length).to.equal(52), next()
				});
			});


			it('parallel(m,p,G1,S2,G2,c,d,A3)', (next) =>
			{
				array.length = 0;

				parallel(m,p,G1,S2,G2,c,d,A3).run(() => {
					expect(array.length).to.equal(193), next()
				});
			});


			it('series(d,p,G1,S1,b,e,G2,A1,O3)', (next) =>
			{
				array.length = 0;

				series(d,p,G1,S1,b,e,G2,A1,O3).run(() => {
					expect(array.length).to.equal(198), next()
				});
			});
		});


