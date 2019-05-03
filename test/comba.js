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
					const list = [], ƒ = (n) => (ok) => { list.push(n); ok() };

					series(ƒ('s1'), ƒ('s2'), ƒ('s3')).run();

					expect(list).to.be.equalTo(['s1', 's2', 's3']);

					done();
				});

				it('[sync] series(s1, s2, s3).run(complete)  ≡  [s1, s2, s3]', (done) =>
				{
					const list = [], ƒ = (n) => (ok) => { list.push(n); ok() };

					series(ƒ('s1'), ƒ('s2'), ƒ('s3')).run(() =>
					{
						expect(list).to.be.equalTo(['s1', 's2', 's3']);
						done();
					});
				});

				it('[async] series(s1, s2, s3).run(complete)  ≡  [s1, s2, s3]', (done) =>
				{
					const list = [], ƒ = (n, t) => (ok) => setTimeout(() => { list.push(n); ok() }, t);

					series(ƒ('s1', 200), ƒ('s2', 100), ƒ('s3', 300)).run(() =>
					{
						expect(list).to.be.equalTo(['s1', 's2', 's3']);
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
					const list = [], ƒ = (n) => (ok) => { list.push(n); ok() };

					parallel(ƒ('p1'), ƒ('p2'), ƒ('p3')).run();

					expect(list).to.be.equalTo(['p1', 'p2', 'p3']);

					done();
				});

				it('[sync] parallel(p1, p2, p3).run(complete)  ≡  [p1, p2, p3]', (done) =>
				{
					const list = [], ƒ = (n) => (ok) => { list.push(n); ok() };

					parallel(ƒ('p1'), ƒ('p2'), ƒ('p3')).run(() =>
					{
						expect(list).to.be.equalTo(['p1', 'p2', 'p3']);
						done();
					});
				});
			});
		});

	});