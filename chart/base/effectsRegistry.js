export class EffectsRegistry {

	constructor(chart) {
		/**
		 * @param {Object} chart
		 */
		this.chart = chart;
		this.effects = new Map();
	}

	_getEffect(name) {
		if (!(this.effects.has(name))) {
			throw new Error('Effect does not exist');
		}
		return this.effects.get(name);
	}

	list(visible = 'all') {
		const f = visible === 'all' ? () => true : (e) => e.visible === visible;
		return [...this.effects.values()]
			.filter(f)
			.map(e => e.name);
	}

	add(name, effect, show = false) {
		if (effect.applyEffect === undefined || effect.removeEffect === undefined) {
			throw new Error('imp');
		}
		if (show) {
			effect.applyEffect(this.chart);
		}
		this.effects.set(name, {name: name, effectObject: effect, visible: show});
	}

	show(name) {
		const effect = this._getEffect(name);
		effect.effectObject.applyEffect(this.chart);
		effect.visible = true;
	}

	hide(name) {
		const effect = this._getEffect(name);
		effect.effectObject.removeEffect();
		effect.visible = false;
	}

	showAll() {
		for (const effectName of this.list()) {
			this.show(effectName);
		}
	}

	hideAll() {
		for (const effectName of this.list()) {
			this.hide(effectName);
		}
	}
}