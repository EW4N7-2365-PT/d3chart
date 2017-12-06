import * as d3 from 'd3';

export class SymbolEffect {
	applyEffect(chart) {
		d3.selectAll('.layer-1')
			.append('text')
			.text('APPL')
			.classed('symbol-effect', true)
			.attr('fill', 'grey')
			.attr('opacity', 0.1)
			.attr('transform', `translate(${(chart.width / 2) - 100 }, ${chart.height / 2 + 20} )`)
			.attr('font-size', '100pt')
			.attr('font-family', 'sans-serif');

	}

	removeEffect() {
		d3.selectAll('.symbol-effect').remove();
	}
}