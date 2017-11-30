import * as d3 from 'd3';

export class AreaEffect {
	/**
	 *
	 * @param {string} [fillColor=blue] - color of the area
	 * @param {number} opacity
	 */
	constructor({fillColor, opacity} = {}) {
		this.fillColor = fillColor || 'blue';
		this.opacity = opacity || .5;
	}

	applyEffect(chart) {
		const area = d3.area()
			.y0(chart.height)
			.x((d) => chart.scaleX(d.x))
			.y1((d) => chart.scaleY(d.y));
		chart.container
			.append('path')
			.attr('fill', this.fillColor)
			.attr('opacity', this.opacity)
			.classed('area-effect-area', true)
			.attr('d', area(chart.data));
	}

	removeEffect() {
		d3.selectAll('.area-effect-area').remove();
	}
}