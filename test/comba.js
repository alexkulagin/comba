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


		describe(H('\n\nSERIES EXECUTION:'), () =>
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

					series(ƒ(l, 's1', 200), ƒ(l, 's2', 100), ƒ(l, 's3', 300)).run(() =>
					{
						expect(l).to.be.equalTo(['s1', 's2', 's3']);
						done();
					});
				});
			});
		});


		describe(H('\n\nPARALLEL EXECUTION:'), () =>
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

					parallel(ƒ(l, 'p1', 300), ƒ(l, 'p2', 200), ƒ(l, 'p3', 250)).run(() =>
					{
						expect(l).to.be.equalTo(['p2', 'p3', 'p1']);
						done();
					});
				});
			});
		});


		describe(H('\n\nPARALLEL EXECUTION (LIMITED):'), () =>
		{
			describe('', () =>
			{
				it('[sync & async] parallel(p1, p2, p3, p4, p5, p6).limit(1).run(complete)  ≡  [p1, p2, p3, p4, p5, p6]', (done) =>
				{
					const l = [];

					parallel(ƒ(l, 'p1', 800), ƒ(l, 'p2', 400), ƒ(l, 'p3'), ƒ(l, 'p4', 600), ƒ(l, 'p5'), ƒ(l, 'p6')).limit(1).run(() =>
					{
						expect(l).to.be.equalTo(['p1', 'p2', 'p3', 'p4', 'p5', 'p6']);
						done();
					});

				});

			});
		});

	});