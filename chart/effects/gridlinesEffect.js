import * as d3 from 'd3';

export class GridlinesEffecct {

	applyEffect(chart) {

		const gridlinesY = d3.axisLeft(chart.scaleY)
			.tickFormat('')
			.tickSize(-(chart.width - chart.margin));

		const gridlinesX = d3.axisBottom(chart.scaleX)
			.tickFormat('')
			.tickSize(-(chart.height - chart.margin));

		d3.select('.layer-0')
			.append('g')
			.classed('grid y-grid', true)
			.attr('transform', `translate(${chart.margin},0)`)
			.call(gridlinesY);

		d3.select('.layer-0')
			.append('g')
			.classed('grid y-grid', true)
			.attr('transform', `translate(0,${chart.height})`)
			.call(gridlinesX);
	}

	removeEffect() {
		// d3.selectAll('.').remove();
	}

}