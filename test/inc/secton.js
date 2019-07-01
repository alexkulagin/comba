'use strict';


//┐  SECTON REPORTER
//╠──███████████████████████████████████████████████████████████████████████████
//┘


	//┐  IMPORTS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const
			fs = require('fs'),
			chalk = require('chalk'),

			Mocha = require('mocha');



	//┐  SETUP
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		Mocha.utils.inherits(Secton, Mocha.reporters.Base);
		Secton.description = 'hierarchical & verbose [default]';



	//┐  CONSTANTS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const
		{
			// EVENT_HOOK_BEGIN, EVENT_HOOK_END,
			// EVENT_DELAY_BEGIN, EVENT_DELAY_END,
			// EVENT_TEST_END, EVENT_TEST_RETRY,

			EVENT_RUN_BEGIN,
			EVENT_RUN_END,
			EVENT_SUITE_BEGIN,
			EVENT_SUITE_END,
			EVENT_TEST_BEGIN,
			EVENT_TEST_FAIL,
			EVENT_TEST_PASS,
			EVENT_TEST_PENDING

		} = Mocha.Runner.constants,

		clr = chalk.constructor(),

		log = console.log;



	//┐  STYLES
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		clr.HEADLINE = clr.bold.green;
		clr.SUITE = clr.bold.cyan;
		clr.BLOCK = clr.whiteBright;
		clr.DOT = clr.cyan;
		clr.SUCCESS = clr.green;
		clr.ERROR = clr.red;
		clr.FAST = clr.greenBright;
		clr.SLOW = clr.redBright;
		clr.TITLE = clr.gray;
		clr.PENDING = clr.blue;



	//┐  TEMPLATE
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		// READ TPL
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const __tpl = (file) => fs.readFileSync(`${__dirname}/template/${file}.tpl`, 'utf8');


		// TPL INTERPOLATION
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const __interpolateTPL = (tpl, ctx) => new Function(...Object.keys(ctx), `return clr\`${tpl}\`;`)(...Object.values(ctx));


		// CONFIG
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const __cfg =
			{
				list: ['headline', 'suite', 'block'],
				width: 68,
				indent: 2,
				fast: 1,
				slow: 100
			};


		// SECTIONS
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const __section =
			{
				headline:
				{
					tpl: __tpl('section.headline'),
					left: 0, right: 0, br: 2
				},

				suite:
				{
					tpl: __tpl('section.suite'),
					left: 0, right: 2, br: 2
				},

				block:
				{
					tpl: __tpl('section.block'),
					left: 0, right: 4, br: 1
				}
			};


		// TESTS
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const __test =
			{
				success:
				{
					tpl: __tpl('test.success'),
					left: 0, right: 4, br: 0
				},

				pending:
				{
					tpl: __tpl('test.pending'),
					left: 0, right: 4, br: 0
				},

				error:
				{
					tpl: __tpl('test.error'),
					left: 0, right: 4, br: 0
				}
			};



	//┐  PROGRESS BAR
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const
			__progressSticks = 40,
			__progressIndent = 4;


		// DRAW PROGRESS
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const __drawProgress = (runner) =>
			{
				const
					totalN = runner.total,
					currentN = runner.stats.tests,

					completeSticks = Math.ceil(__progressSticks * (currentN / totalN)),
					pendingSticks = __progressSticks - completeSticks,

					coS = clr.green(''.padEnd(completeSticks, '▋')),
					peS = clr.green.dim(''.padEnd(pendingSticks, '▪')),

					br = ''.padEnd(__progressIndent, '\n');


				return br + clr.yellow(`   ▏${ coS }${ peS }▕  processing...  `) + `${ currentN + 1 } of ${ totalN }`;
			};


		// CLEAR PROGRESS
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const __clearProgress = () => `\x1b[${ __progressIndent + 1 }A\x1b[0J`;



	//┐  PREPARE SUTES
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __prepare (suites, depth, list, section)
		{
			if (suites.length)
			{
				const
					key = list[depth],
					br = section[key].br,
					len = suites.length - 1;

				suites.forEach((suite, index) =>
				{
					suite.depth = depth;
					suite.br = (depth > 0 && (index >= len)) ? 0 : br;

					if (suite.suites.length) {
						__prepare(suite.suites, depth + 1, list, section);
					}
				});
			}
		}




//┐  CONSTRUCTOR
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘

	function Secton (runner, options)
	{

		Mocha.reporters.Base.call(this, runner, options);


		// PROPERTIES
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			let self = this,
				depth = 0,
				n = 0,

				_list = __cfg.list,
				_len = _list.length,
				_width = __cfg.width,
				_fast = __cfg.fast,
				_slow = __cfg.slow;

			__prepare(runner.suite.suites, depth, _list, __section);



		// ON RUN 
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬


			// BEGIN RUN
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				runner.on(EVENT_RUN_BEGIN, () => log());


			// END RUN
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				runner.once(EVENT_RUN_END, self.epilogue.bind(self));


		// ON SUITE
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬


			// BEGIN SUITE
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				runner.on(EVENT_SUITE_BEGIN, suite =>
				{

					if (depth > 0)
					{
						const
							index = (depth >= _len) ? _len - 1 : depth - 1,
							key = _list[index],
							sectionTPL = __section[key],

							{ tpl, left, right } = sectionTPL,

							ctx =
							{
								title: suite.title,
								width: _width - left - right,
								clr: clr
							};

						log(__interpolateTPL(tpl, ctx));
					}

					depth += 1;
				});


			// END SUITE
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				runner.on(EVENT_SUITE_END, suite =>
				{
					if (suite.br > 0) {
						log((suite.br > 1) ? ''.padEnd(suite.br - 1, '\n') : '');
					}

					depth -= 1;
				});


		// ON TEST
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬


			// BEGIN TEST
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				runner.on(EVENT_TEST_BEGIN, test =>
				{
					log(__drawProgress(runner));
				});


			// PASS TEST
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				runner.on(EVENT_TEST_PASS, test =>
				{
					displayTest(test, 'success');
				});


			// PENDING TEST
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				runner.on(EVENT_TEST_PENDING, test =>
				{
					displayTest(test, 'pending');
				});


			// FAIL TEST
			// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

				runner.on(EVENT_TEST_FAIL, test =>
				{
					displayTest(test, 'error');
				});


		// DISPLAY TEST
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬


			function displayTest (target, type)
			{
				const
					testTPL = __test[type],

					{ tpl, left, right } = testTPL,

					duration = target.duration,

					isTime = duration > _fast,
					isSlow = duration > _slow,

					ctx =
					{
						title: target.title,
						width: _width - left - right,
						time: isTime ? ' (' + duration + 'ms) ' : '',
						slow: isSlow,
						clr: clr
					};

				log(__clearProgress() + __interpolateTPL(tpl, ctx));
			}
	}




//┐  EXPORTS
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘

	exports = module.exports = Secton;


