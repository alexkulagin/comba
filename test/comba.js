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
			const { expect } = require('chai');


		// MODULES
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const { series, parallel } = require('../lib/Comba');



	//┐  STYLING WRAPPERS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘


		const T = (str) => chalk.bold.hex('#11CE80')(str);
		const H = (str) => chalk.bold.hex('#E22C52')(str);




//┐  TESTS
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	describe(T('COMBA TEST\n░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n\n'), () =>
	{
		describe(H('interfaces:'), () =>
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
	});