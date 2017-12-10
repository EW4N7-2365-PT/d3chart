export class EffectBase {
	constructor() {
		if (new.target === EffectBase) {
			throw new Error('Effect Base is abstract');
		}
		if (this.apply === undefined) {
			throw new Error('Effect must implement applyEffect method');
		}
		if (this.remove === undefined) {
			throw new Error('Effect must implement removeEffect method');
		}
		if (this.serialize === undefined) {
			throw new Error('Effect must implement serialize method');
		}
		if (this.update === undefined) {
			throw new Error('Effect must implement update method');
		}
	}
}
