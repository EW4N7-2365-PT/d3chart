import * as d3 from 'd3';
import {EffectBase} from './effectBase';

export class DataPointEffect extends EffectBase {
	/**
	 *
	 * @param {number}  [r=5]
	 * @param {string} [fillColor=blue]
	 * @param {number} [transitionTime=450]
	 */
	constructor({r, fillColor, transitionTime} = {}) {
		super();
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

	update({r, fillColor}) {
		this.r = r;
		this.fillColor = fillColor;
		d3.selectAll('.data-point-circle')
			.transition()
			.duration(this.transitionTime)
			.attr('r', this.r)
			.attr('fill', this.fillColor);
	}

	serialize() {
		return {
			r: this.r,
			fillColor: this.fillColor,
			transitionTime: this.transitionTime
		};
	}
}
