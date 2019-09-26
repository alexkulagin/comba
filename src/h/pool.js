


	//┐  IMPORTS
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘

		const
			objectCreate = require('./objectCreate'),
			isArray = require('./isArray');



	//┐  OBJECT POOL
	//╠──⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙⁘⁙
	//┘


		module.exports = (create, n) =>
		{

			let _limit = (n && n > 0) ? n : 2,

				_total = 0,
				_used = 0,

				_pool = [];



			// POOL FILLING
			// ─────────────────────────────────────────────────

				const _fill = n =>
				{
					let i = _total;

					_total += Number(n);

					for (i; i < _total; i++) {
						_pool[i] = create();
					}
				};



			// ALLOCATION
			// ─────────────────────────────────────────────────

				const _use = () =>
				{

					// CHECK FILLING
					// ·········································

						if (_used === _total) {
							_fill(_limit);
						}


					// GET & RETURN
					// ·········································

						const instance = _pool[_used];

						_pool[_used] = null;
						_used += 1;

						return instance;

				};



			// RELEAS
			// ─────────────────────────────────────────────────

				const _release = (value) =>
				{
					if (_used > 0)
					{
						_used -= 1;
						_pool[_used] = values[0];
					}
				};



			// DISPOSE
			// ─────────────────────────────────────────────────

				const _dispose = () =>
				{
					_total = 0,
					_used = 0,

					_pool = [];
				};



			// INITIALIZE FILLING
			// ─────────────────────────────────────────────────

				_fill(_limit);



			// PUBLIC
			// ─────────────────────────────────────────────────

				return objectCreate(null,
				{
					total: { get: () => _total },
					used: { get: () => _used },
					free: { get: () => _total - _used },
					limit: { set: n => _limit = n },

					fill: { value: _fill },
					use: { value: _use },
					release: { value: _release },

					dispose: { value: _dispose },
				});
		};


