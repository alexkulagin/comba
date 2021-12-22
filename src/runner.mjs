'use strict';


//┐  COMBA RUNNER
//╠──███████████████████████████████████████████████████████████████████████████
//┘


	//┐  IMPORTS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		import { isString, dummy, hasKey, delay, log } from './utils.mjs';




//┐  CONSTRUCTOR
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	function CombaRunner (list, props)
	{

		// INSTANCE
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const instance = Object.setPrototypeOf(() => instance.run(), this);
			instance.constructor = CombaRunner;


		return __interface(instance, list, props);
	}



	//┐  INTERFACE
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __interface (instance, list, props)
		{

			// PROPERTIES
			// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

				list = [ ...list ];

				let $events = Object.assign(dummy(), props.events),
					$scope = props.scope,

					$isParallel = props.isParallel,
					$limit = props.limit,
					$delay = props.delay,
					$interval = props.interval,

					$total = list.length,
					$pending = $total,
					$completed = 0;

				

			Object.defineProperties(instance,
			{

				// CHAINABLE METHODS
				// ─────────────────────────────────────────────────

				
					/* name: { value: (value) => !!value } */



				// EXECUTION
				// ─────────────────────────────────────────────────

				
					run:
					{
						value: () =>
						{
							__send($events, 'run');

							if ($delay) {
								delay(instance.exec, $delay);
							}

							else instance.exec();
						}
					},


					exec:
					{
						value: () =>
						{
							if ($isParallel)
							{
								list.some((value, index) =>
								{
									if ($interval && index > 0) {
										delay(instance.next, $interval * index);
									}

									else instance.next();

									if ($limit && index >= ($limit - 1)) {
										return true;
									}
								});
							}

							else instance.next();
						}
					},


					next:
					{
						value: () =>
						{
							let index = $total - $pending,
								target = list[index],
								targetID = 'target_' + index; // temporary dummy

							$pending -= 1;

							const callback = (error = null) =>
							{
								$completed += 1;

								if ($total === $completed || error) {
									return instance.complete(error);
								}

								if ($pending > 0 && (!$isParallel || $isParallel && $limit > 0 && $limit < $total))
								{
									if ($interval) {
										return delay(instance.next, $interval);
									}

									else return instance.next();
								}
							};

							Object.defineProperties(callback,
							{

								done:
								{
									value: callback
								},

								set:
								{
									value: (prop, value) =>
									{
										if (isString(prop)) {
											$scope[prop] = value;
										}
									}
								},

								get:
								{
									value: (prop) => 
									{
										if (isString(prop)) {
											return $scope[prop];
										}
									}
								}

							});


							target.run(callback, target.isList ? $scope : null);
						}
					},


					complete:
					{
						value: (error) =>
						{
							if (error) {
								throw log.error(error);//new Error ('callback error ' + error);
							}

							__send($events, 'end');
							__send($events, 'done');
							__send($events, 'complete');
						}
					}

			});


			return instance;
		}




//┐  UTILS
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	//┐  TOTAL TASKS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __send (events, event, ...args)
		{
			!!events[event] && events[event].apply(null, args);
		}




//┐  EXPORTS
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘

	export default CombaRunner;


