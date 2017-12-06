export class EffectsRegistry {

	constructor(chart) {
		/**
		 * @param {Object} chart
		 */
		this.chart = chart;
		this._effects = new Map();
	}

	_getEffect(name) {
		if (!(this._effects.has(name))) {
			throw new Error(`Effect ${name} does not exist`);
		}
		return this._effects.get(name);
	}

	list(visible = 'all') {
		const f = visible === 'all' ? () => true : e => e.visible === visible;
		return [...this._effects.values()]
			.filter(f)
			.map(e => e.name);
	}

	add(name, effect, show = false) {
		if (show) {
			effect.applyEffect(this.chart);
		}
		this._effects.set(name, {name: name, effectObject: effect, visible: show});
	}

	show(name) {
		const effect = this._getEffect(name);
		effect.effectObject.applyEffect(this.chart);
		effect.visible = true;
	}

	hide(name, resize = false) {
		const effect = this._getEffect(name);
		effect.effectObject.removeEffect();
		effect.visible = resize;
	}

	toggle(name) {
		if (this.list(true).includes(name)) {
			this.hide(name);
		} else {
			this.show(name);
		}
	}

	hideOnResize() {
		for (const effectName of this.list(true)) {
			this.hide(effectName, true);
		}
	}

	applyOnResize() {
		for (const effect of this.list(true)) {
			this.show(effect);
		}
	}
}
