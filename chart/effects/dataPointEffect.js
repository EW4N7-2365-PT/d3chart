import * as d3 from 'd3';

export class DataPointEffect {
	/**
	 *
	 * @param {number}  [r=5]
	 * @param {string} [fillColor=blue]
	 * @param {number} [transitionTime=450]
	 */
	constructor({r, fillColor, transitionTime} = {}) {
		this.r = r || 5;
		this.fillColor = fillColor || 'blue';
		this.transitionTime = transitionTime || 450;
	}

	/**
	 *
	 * @param {ChartBase} chart
	 */
	applyEffect(chart) {
		chart.container.selectAll('point')
			.data(chart.data)
			.enter()
			.append('circle')
			.classed('data-point-circle', true)
			.attr('r', this.r)
			.attr('cx', d => chart.scaleX(d.x))
			.attr('cy', d => chart.scaleY(d.y))
			.attr('fill', this.fillColor)
			.attr('opacity', 0);
		d3.selectAll('.data-point-circle')
			.transition()
			.duration(this.transitionTime)
			.attr('opacity', 1);

	}

	removeEffect() {
		d3.selectAll('.data-point-circle').remove();
	}
}