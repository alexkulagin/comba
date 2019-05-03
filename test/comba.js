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
				it('[sync] series(a1, b1, c1).run()', (done) =>
				{
					const list = [], ƒ = (n) => (ok) => { list.push(n); ok() };

					series(ƒ('a1'), ƒ('b1'), ƒ('c1')).run();

					expect(list).to.be.equalTo(['a1', 'b1', 'c1']);

					done();
				});

				it('[sync] series(a2, b2, c2).run(complete)', (done) =>
				{
					const list = [], ƒ = (n) => (ok) => { list.push(n); ok() };

					series(ƒ('a2'), ƒ('b2'), ƒ('c2')).run(() =>
					{
						expect(list).to.be.equalTo(['a2', 'b2', 'c2']);
						done();
					});
				});
			});
		});
	});