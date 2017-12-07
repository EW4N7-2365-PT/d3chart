import * as d3 from 'd3';
import {EffectBase} from './effectBase';

export class SymbolEffect extends EffectBase {
	constructor({symbol, transitionTime} = {}) {
		super();
		this.symbol = symbol || 'Provide symbol';
		this.transtionTime = transitionTime || 750;
	}

	applyEffect(chart) {
		d3.selectAll('.layer-1')
			.append('text')
			.text(this.symbol.toUpperCase())
			.classed('symbol-effect', true)
			.attr('fill', 'grey')
			.attr('opacity', 0)
			.attr('transform', `translate(${(chart.width / 2) - 100 }, ${(chart.height / 2) + 50} )`)
			.attr('font-size', '100pt')
			.attr('font-family', 'sans-serif');
		d3.selectAll('.symbol-effect')
			.transition()
			.duration(this.transtionTime)
			.attr('opacity', 0.1);
	}

	removeEffect() {
		d3.selectAll('.symbol-effect').remove();
	}

	serialize() {
		return {};
	}
}
