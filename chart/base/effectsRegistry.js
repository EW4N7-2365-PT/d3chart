import {effectsMap} from '../effects/effectsMap';

export class EffectsRegistry {

	constructor(chart) {
		/**
		 * @param {Object} chart
		 */
		this.chart = chart;
		this._effects = new Map();
	}

	_getEffect(name) {
		if (!(effectsMap.has(name))) {
			throw new Error(`Effect ${name} does not exist`);
		}
		return effectsMap.get(name);
	}

	_list(visible = 'all') {
		const f = visible === 'all' ? () => true : e => e.visible === visible;
		return [...this._effects.values()]
			.filter(f)
			.map(e => e.name);
	}

	add(name, config = {}) {
		const effect = this._getEffect(name);
		this._effects.set(name, {
			name: name,
			effectObject: new effect(config),
			visible: false
		});
	}

	addAll(config = {}) {
		for (const effectName of effectsMap.keys()) {
			const effectConfig = config[effectName] || {};
			this.add(effectName, effectConfig);
		}
	}

	apply(name) {
		const effect = this._effects.get(name);
		effect.effectObject.applyEffect(this.chart);
		effect.visible = true;
	}

	remove(name, resize = false) {
		const effect = this._effects.get(name);
		effect.effectObject.removeEffect();
		effect.visible = resize;
	}

	toggle(name) {
		if (this._list(true).includes(name)) {
			this.remove(name);
		} else {
			this.apply(name);
		}
	}

	hideOnResize() {
		for (const effectName of this._list(true)) {
			this.remove(effectName, true);
		}
	}

	applyOnResize() {
		for (const effect of this._list(true)) {
			this.apply(effect);
		}
	}

	serializeEffects() {
		/* TODO: */
	}
}
