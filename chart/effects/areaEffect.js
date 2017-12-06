import * as d3 from 'd3';

export class AreaEffect {
	/**
	 *
	 * @param {string} [fillColor=blue] - color of the area
	 * @param {number} [opacity=0.5]
	 * @param {number} [transitionTime=350]
	 */
	constructor({fillColor, opacity, transitionTime} = {}) {
		this.fillColor = fillColor || 'blue';
		this.opacity = opacity || .5;
		this.transitionTime = transitionTime || 350;
	}

	applyEffect(chart) {
		const area = d3.area()
			.y0(chart.height)
			.x((d) => chart.scaleX(d.x))
			.y1((d) => chart.scaleY(d.y));
		d3.select('.layer-1')
			.append('path')
			.attr('fill', this.fillColor)
			.attr('opacity', 0)
			.classed('area-effect-area', true)
			.attr('d', area(chart.data));
		d3.selectAll('.area-effect-area')
			.transition()
			.duration(this.transitionTime)
			.attr('opacity', this.opacity);
	}

	removeEffect() {
		d3.selectAll('.area-effect-area').remove();
	}
}
