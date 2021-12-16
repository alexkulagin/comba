'use strict';


//┐  COMBA MILL
//╠──███████████████████████████████████████████████████████████████████████████
//┘


	//┐  IMPORTS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		import { dummy, delay, log } from './utils.mjs';



	//┐  EVENTS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		import Event from './event/events.mjs';	




//┐  CONSTRUCTOR
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	function CombaMill (list, dispatcher, props)
	{


		// PROPERTIES
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			list = [ ...list ];


		// INSTANCE
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const instance = Object.setPrototypeOf(() => instance.run(), this);
			instance.constructor = CombaMill;


		return __interface(instance, list, dispatcher, props);
	}



	//┐  INTERFACE
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __interface (instance, list, dispatcher, props)
		{

			let $total = list.length,
				$pending = $total,
				$completed = 0,

				$isParallel = props.isParallel,
				$limit = props.limit,
				$delay = props.delay,
				$interval = props.interval;


			Object.defineProperties(instance,
			{

				// CHAINABLE METHODS
				// ─────────────────────────────────────────────────

				
					// PARALLEL LIMIT
					// ·············································
					
						/*limit:
						{
							value: (value) =>
							{
								options.limit = (!isSeries && isInt(value)) ? value : 0;

								return instance;
							}
						}*/


				// EXECUTION
				// ─────────────────────────────────────────────────

				
					run:
					{
						value: () =>
						{
							dispatcher.send(Event.RUN);

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

							const done = (error = null) =>
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


							target.run(done);
						}
					},


					complete:
					{
						value: (error) =>
						{
							if (error) {
								throw log.error(error);//new Error ('callback error ' + error);
							}

							dispatcher.send(Event.END);
							dispatcher.send(Event.DONE);
							dispatcher.send(Event.COMPLETE);
						}
					}

			});


			return instance;
		}




//┐  EXPORTS
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘

	export default CombaMill;


