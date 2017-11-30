import * as d3 from 'd3';

export class DataPointEffect {
	/**
	 *
	 * @param r
	 * @param {string} [fillColor=blue]
	 */
	constructor({r, fillColor} = {}) {
		this.r = r || 5;
		this.fillColor = fillColor || 'blue';
	}

	/**
	 *
	 * @param {ChartBase} chart
	 */
	applyEffect(chart) {
		chart.container.selectAll('data-point-circle')
			.data(chart.data)
			.enter()
			.append('circle')
			.classed('data-point-circle', true)
			.attr('r', this.r)
			.attr('cx', (d) => chart.scaleX(d.x))
			.attr('cy', (d) => chart.scaleY(d.y))
			.attr('fill', this.fillColor);
	}

	removeEffect() {
		d3.selectAll('.data-point-circle').remove();
	}
}