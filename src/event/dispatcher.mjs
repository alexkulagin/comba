


	// INSTANCE
	// ⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖

		import { isFunction } from '../utils.mjs';




//┐  CONSTRUCTOR
//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//┘


	function CombaDispatcher ()
	{

		// INSTANCE
		// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

			const instance = Object.setPrototypeOf((event, ...args) => instance.send(event, ...args), this);
			instance.constructor = CombaDispatcher;


		return __interface(instance);
	}



	//┐  INTERFACE
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		function __interface (instance)
		{
			let $listeners = {};

			Object.defineProperties(instance,
			{

				on:
				{
					value: (event, handler, once) =>
					{
						if (!$listeners.hasOwnProperty(event)) {
							$listeners[event] = [];
						}

						$listeners[event].push({ handler: handler, once: once });
					}
				},


				once:
				{
					value: (event, handler) =>
					{
						instance.on(event, handler, true);
					}
				},


				off:
				{
					value: (event, handler) =>
					{
						if (event === undefined && handler === undefined)
						{
							$listeners = {};
							return;
						}

						if (!$listeners.hasOwnProperty(event)) {
							return;
						}

						if (!handler)
						{
							delete $listeners[event];
							return;
						}

						else if (!isFunction(handler)) {
							return;
						}

						let list = $listeners[event],
							item, i = 0;

						for (i; i < list.length; i++)
						{
							item = list[i];

							if (item !== null && item.handler === handler) {
								list[i] = null;
							}
						}
					}
				},


				send:
				{
					value: (event, ...args) =>
					{
						if (event === undefined || !$listeners.hasOwnProperty(event)) {
							return;
						}

						let list = $listeners[event],
							len = list.length,
							i = 0,

							item;

						for (i; i < len; i++)
						{
							item = list[i];

							if (item !== null)
							{
								item.handler.apply(instance, args);

								if (item.once === true) {
									list[i] = null;
								}
							}
						}
					}
				}


			});


			return instance;
		}




	//┐  EXPORT
	//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	//┘

		export default CombaDispatcher;



