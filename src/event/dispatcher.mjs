


	// INSTANCE
	// ⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖⏖

		import { isFunction } from '../utils.mjs';




	//┐  DISPATCHER
	//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	//┘

		/**
		 * @constructor
		 * Вещатель событий
		 */
		const Dispatcher = function ()
		{
			this.listeners = {};
		},

		__ = Dispatcher.prototype;




	//┐  PUBLIC API
	//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	//┘


		//┐  LISTENERS
		//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
		//┘

			/**
			 * @public
			 * Добавляет слушателя
			 * @param {string} event - название события
			 * @param {function} handler - функция обработчик
			 * @param {boolean} once - слушатель удалится после первого запуска
			 * @return {void}
			 */
			__.on = function (event, handler, once)
			{
				if (!this.listeners.hasOwnProperty(event)) {
					this.listeners[event] = [];
				}

				this.listeners[event].push({ handler: handler, once: once });
			};


			/**
			 * @public
			 * Добавляет слушателя, удаляющегося после запуска
			 * @param {string} event - название события
			 * @param {function} handler - функция обработчик
			 * @return {void}
			 */
			__.once = function (event, handler)
			{
				this.on(event, handler, true);
			};


			/**
			 * @public
			 * Удаляет слушателя
			 * @param {string} event - название события
			 * @param {?function} handler - функция обработчик
			 * @return {void}
			 */
			__.off = function (event, handler)
			{
				if (event === undefined && handler === undefined)
				{
					this.listeners = {};
					return;
				}

				if (this.listeners.hasOwnProperty(event) === false) {
					return;
				}

				if (handler === undefined || handler === null)
				{
					delete this.listeners[event];
					return;
				}

				else if (isFunction(handler) === false) {
					return;
				}

				let list = this.listeners[event], item,
					i = 0;

				for (i; i < list.length; i++)
				{
					item = list[i];

					if (item !== null && item.handler === handler) {
						list[i] = null;
					}
				}
			};



		//┐  BROADCASTING
		//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
		//┘

			/**
			 * @public
			 * Рассылает событие
			 * @param {string} event - название события
			 * @param {?array} args - аргументы
			 * @return {void}
			 */
			__.send = function (event, ...args)
			{
				if (event === undefined || this.listeners.hasOwnProperty(event) === false) {
					return;
				}

				let list = this.listeners[event],
					len = list.length,
					i = 0,

					item;

				for (i; i < len; i++)
				{
					item = list[i];

					if (item !== null)
					{
						item.handler.apply(this, args);

						if (item.once === true) {
							list[i] = null;
						}
					}
				}
			};




	//┐  EXPORTS
	//╠──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
	//┘

		export default Dispatcher;



