import * as d3 from 'd3';

export class SymbolEffect {
	applyEffect(chart) {
		d3.selectAll('.layer-0')
			.append('text')
			.text('FB')
			.classed('symbol-effect', true)
			.attr('fill', 'grey')
			.attr('opacity', 0.5)
			.attr('transform', `translate(${chart.margin + 5}, ${chart.margin * 2})`)
			.attr('font-size', '45pt')
			.attr('font-family', 'sans-serif');

	}

	removeEffect() {
		d3.selectAll('.symbol-effect').remove();
	}
}