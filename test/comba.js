'use strict';


//┐  COMBA
//╠──███████████████████████████████████████████████████████████████████████████
//┘


	//┐  IMPORTS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		// NODE
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const chalk = require('chalk');
			const chai = require('chai');
			const expect = chai.expect;
			const assert = chai.assert;
			const assertArrays = require('chai-arrays');


		// MODULES
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const { series, parallel } = require('../lib/Comba');



	//┐  CHAI PLUGIN
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		chai.use(assertArrays);



	//┐  STYLING WRAPPERS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const T = (str) => chalk.bold.hex('#11CE80')(str);
		const H = (str) => chalk.bold.hex('#489844')(str);



	//┐  TASKS (SYNC & ASYNC)
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const ƒ = (list, n, t) => (done) =>
		{
			if (t !== undefined) {
				setTimeout(() => { list.push(n), done(); }, t);
			}

			else list.push(n), done();
		};




//┐  TESTS
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	describe(T('COMBA TEST\n░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░'), () =>
	{

		describe(H('\n\nINTERFACES:'), () =>
		{
			describe('', () =>
			{
				it('series is function', () => expect(typeof series).to.equal('function'));
				it('series return instance', () => expect(typeof series()).to.equal('object'));
				it('series instance is Comba', () => expect(series().constructor.name).to.equal('Comba'));
				it('series instance not equal series instance', () => expect(series()).to.not.equal(series()));
			});

			describe('', () =>
			{
				it('parallel is function', () => expect(typeof parallel).to.equal('function'));
				it('parallel return instance', () => expect(typeof parallel()).to.equal('object'));
				it('parallel instance is Comba', () => expect(parallel().constructor.name).to.equal('Comba'));
				it('parallel instance not equal parallel instance', () => expect(parallel()).to.not.equal(parallel()));
			});

			describe('', () =>
			{
				it('series instance not equal parallel instance', () => expect(series()).to.not.equal(parallel()));
				it('series constructor equal parallel constructor', () => expect(series().constructor).to.equal(parallel().constructor));
			});
		});


		describe(H('\n\nSERIES TASKS:'), () =>
		{
			describe('', () =>
			{
				it('[sync] series(s1, s2, s3).run()  ≡  [s1, s2, s3]', (done) =>
				{
					const l = [];

					series(ƒ(l, 's1'), ƒ(l, 's2'), ƒ(l, 's3')).run();

					expect(l).to.be.equalTo(['s1', 's2', 's3']);

					done();
				});

				it('[sync] series(s1, s2, s3).run(complete)  ≡  [s1, s2, s3]', (done) =>
				{
					const l = [];

					series(ƒ(l, 's1'), ƒ(l, 's2'), ƒ(l, 's3')).run(() =>
					{
						expect(l).to.be.equalTo(['s1', 's2', 's3']);
						done();
					});
				});

				it('[async] series(s1, s2, s3).run(complete)  ≡  [s1, s2, s3]', (done) =>
				{
					const l = [];

					series(ƒ(l, 's1', 100), ƒ(l, 's2', 50), ƒ(l, 's3', 150)).run(() =>
					{
						expect(l).to.be.equalTo(['s1', 's2', 's3']);
						done();
					});
				});
			});
		});


		describe(H('\n\nPARALLEL TASKS:'), () =>
		{
			describe('', () =>
			{
				it('[sync] parallel(p1, p2, p3).run()  ≡  [p1, p2, p3]', (done) =>
				{
					const l = [];

					parallel(ƒ(l, 'p1'), ƒ(l, 'p2'), ƒ(l, 'p3')).run();

					expect(l).to.be.equalTo(['p1', 'p2', 'p3']);

					done();
				});

				it('[sync] parallel(p1, p2, p3).run(complete)  ≡  [p1, p2, p3]', (done) =>
				{
					const l = [];

					parallel(ƒ(l, 'p1'), ƒ(l, 'p2'), ƒ(l, 'p3')).run(() =>
					{
						expect(l).to.be.equalTo(['p1', 'p2', 'p3']);
						done();
					});
				});

				it('[async] parallel(p1, p2, p3).run(complete)  ≡  [p2, p3, p1]', (done) =>
				{
					const l = [];

					parallel(ƒ(l, 'p1', 75), ƒ(l, 'p2', 50), ƒ(l, 'p3', 60)).run(() =>
					{
						expect(l).to.be.equalTo(['p2', 'p3', 'p1']);
						done();
					});
				});
			});
		});


		describe(H('\n\nPARALLEL TASKS (LIMITED):'), () =>
		{
			describe('', () =>
			{
				it('[sync & async] parallel(p1, p2, p3, p4, p5, p6).limit(1).run(complete)  ≡  [p1, p2, p3, p4, p5, p6]', (done) =>
				{
					const l = [];

					parallel(ƒ(l, 'p1', 100), ƒ(l, 'p2', 50), ƒ(l, 'p3'), ƒ(l, 'p4', 75), ƒ(l, 'p5'), ƒ(l, 'p6')).limit(1).run(() =>
					{
						expect(l).to.be.equalTo(['p1', 'p2', 'p3', 'p4', 'p5', 'p6']);
						done();
					});
				});

				it('[sync & async] parallel(p1, p2, p3, p4, p5, p6).limit(2).run(complete)  ≡  [p2, p3, p1, p5, p6, p4]', (done) =>
				{
					const l = [];

					parallel(ƒ(l, 'p1', 100), ƒ(l, 'p2', 50), ƒ(l, 'p3'), ƒ(l, 'p4', 75), ƒ(l, 'p5'), ƒ(l, 'p6')).limit(2).run(() =>
					{
						expect(l).to.be.equalTo(['p2', 'p3', 'p1', 'p5', 'p6', 'p4']);
						done();
					});
				});

				it('[sync & async] parallel(p1, p2, p3, p4, p5, p6).limit(3).run(complete)  ≡  [p3, p2, p5, p6, p4, p1]', (done) =>
				{
					const l = [];

					parallel(ƒ(l, 'p1', 100), ƒ(l, 'p2', 50), ƒ(l, 'p3'), ƒ(l, 'p4', 75), ƒ(l, 'p5'), ƒ(l, 'p6')).limit(3).run(() =>
					{
						expect(l).to.be.equalTo(['p3', 'p2', 'p5', 'p6', 'p4', 'p1']);
						done();
					});
				});

				it('[sync & async] parallel(p1, p2, p3, p4, p5, p6).limit(4).run(complete)  ≡  [p3, p5, p6, p2, p4, p1]', (done) =>
				{
					const l = [];

					parallel(ƒ(l, 'p1', 100), ƒ(l, 'p2', 50), ƒ(l, 'p3'), ƒ(l, 'p4', 75), ƒ(l, 'p5'), ƒ(l, 'p6')).limit(4).run(() =>
					{
						expect(l).to.be.equalTo(['p3', 'p5', 'p6', 'p2', 'p4', 'p1']);
						done();
					});
				});

			});
		});


		describe(H('\n\nDELAED EXECUTION:'), () =>
		{
			describe('', () =>
			{
				it('[sync & async] series(s1, s2).delay(100).run()', (done) =>
				{
					const l = [];

					series(ƒ(l, 's1'), ƒ(l, 's2', 50)).delay(100).run();

					expect(l.length).to.equal(0);
					setTimeout(() => ( expect(l.length).to.equal(1) ), 125);
					setTimeout(() => ( expect(l.length).to.equal(2), done() ), 175);
				});

				it('[sync & async] parallel(p1, p2).delay(100).run()', (done) =>
				{
					const l = [];

					parallel(ƒ(l, 'p1'), ƒ(l, 'p2', 50)).delay(100).run();

					expect(l.length).to.equal(0);
					setTimeout(() => ( expect(l.length).to.equal(1) ), 125);
					setTimeout(() => ( expect(l.length).to.equal(2), done() ), 175);
				});

			});
		});


		describe(H('\n\nINSERTING TASKS:'), () =>
		{
			describe('', () =>
			{
				it('[sync & async] series(s1, s2).append(s3, s4).prepend(s5, s6).run(complete)  ≡  [s5, s6, s1, s2, s3, s4]', (done) =>
				{
					const l = [];

					series(ƒ(l, 's1', 50), ƒ(l, 's2', 50)).append(ƒ(l, 's3'), ƒ(l, 's4', 50)).prepend(ƒ(l, 's5'), ƒ(l, 's6')).run(() =>
					{
						expect(l).to.be.equalTo(['s5', 's6', 's1', 's2', 's3', 's4']);
						done();
					});
				});

				it('[sync & async] parallel(p1, p2).append(p3, p4).prepend(p5, p6).run(complete)  ≡  [p5, p6, p3, p1, p2, p4]', (done) =>
				{
					const l = [];

					parallel(ƒ(l, 'p1', 50), ƒ(l, 'p2', 50)).append(ƒ(l, 'p3'), ƒ(l, 'p4', 50)).prepend(ƒ(l, 'p5'), ƒ(l, 'p6')).run(() =>
					{
						expect(l).to.be.equalTo(['p5', 'p6', 'p3', 'p1', 'p2', 'p4']);
						done();
					});
				});

			});
		});


		describe(H('\n\nPASSING LISTS:'), () =>
		{
			describe('', () =>
			{
				it('[sync & async] series(listA, listB).prepend(listC).append(listD).run(complete)  ≡  [s4, s5, s1, s2, s1, s2, s3, s4, s5, s1, s4, s5, s4, s2]', (done) =>
				{
					const l = [];
					const listA = [ƒ(l, 's1', 50), ƒ(l, 's2', 50), [ƒ(l, 's3'), ƒ(l, 's4', 50)]];
					const listB = [ƒ(l, 's5'), [ƒ(l, 's1', 50), [ƒ(l, 's4', 50), ƒ(l, 's5')]]];
					const listC = [ƒ(l, 's4', 50), [ƒ(l, 's5'), [ƒ(l, 's1', 50), ƒ(l, 's2', 50)]]];
					const listD = [ƒ(l, 's4', 50), ƒ(l, 's2', 50)];

					series(listA, listB).prepend(listC).append(listD).run(() =>
					{
						expect(l).to.be.equalTo(['s4', 's5', 's1', 's2', 's1', 's2', 's3', 's4', 's5', 's1', 's4', 's5', 's4', 's2']);
						done();
					});
				});

				it('[sync & async] parallel(listA, listB).prepend(listC).append(listD).run(complete)  ≡  [p5, p3, p5, p5, p4, p1, p2, p1, p2, p4, p1, p4, p4, p2]', (done) =>
				{
					const l = [];
					const listA = [ƒ(l, 'p1', 50), ƒ(l, 'p2', 50), [ƒ(l, 'p3'), ƒ(l, 'p4', 50)]];
					const listB = [ƒ(l, 'p5'), [ƒ(l, 'p1', 50), [ƒ(l, 'p4', 50), ƒ(l, 'p5')]]];
					const listC = [ƒ(l, 'p4', 50), [ƒ(l, 'p5'), [ƒ(l, 'p1', 50), ƒ(l, 'p2', 50)]]];
					const listD = [ƒ(l, 'p4', 50), ƒ(l, 'p2', 50)];

					parallel(listA, listB).prepend(listC).append(listD).run(() =>
					{
						expect(l).to.be.equalTo(['p5', 'p3', 'p5', 'p5', 'p4', 'p1', 'p2', 'p1', 'p2', 'p4', 'p1', 'p4', 'p4', 'p2']);
						done();
					});
				});

			});
		});

	});