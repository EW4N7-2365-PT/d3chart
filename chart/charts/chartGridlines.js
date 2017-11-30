import * as d3 from 'd3';
import {SingleLineChart} from './singleLineChart';

/**
 *
 * @extends {SingleLineChart}
 */
export class ChartGridlines extends SingleLineChart {
	/**
	 *
	 * @param scale
	 * @returns {*}
	 */
	makeXGridlines(scale) {
		return d3.axisBottom(scale)
			.tickFormat('')
			.tickSize(-(this.height - this.margin));
	}

	/**
	 *
	 * @param scale
	 * @returns {*}
	 */
	makeYGridlines(scale) {
		return d3.axisLeft(scale)
			.tickFormat('')
			.tickSize(-(this.width - this.margin));
	}

	/**
	 *
	 */
	drawYGridlines() {
		this.container
			.insert('g', ':first-child')
			.classed('grid y-grid', true)
			.attr('transform', `translate(${this.margin},0)`)
			.call(this.makeYGridlines(this.scaleY));
	}

	/**
	 *
	 */
	drawXGridlines() {
		this.container
			.insert('g', ':first-child')
			.classed('grid y-grid', true)
			.attr('transform', `translate(0,${this.height})`)
			.call(this.makeXGridlines(this.scaleX));
	}

	/**
	 *
	 * @param width
	 * @param height
	 * @returns {Promise<void>}
	 */
	async resize(width, height) {
		this.container.selectAll('.grid').remove();
		await super.resize(width, height);
		this.drawXGridlines();
		this.drawYGridlines();
		this.effects.showAll();
	}

	drawChart() {
		this.drawXGridlines();
		this.drawYGridlines();
		return super.drawChart();
	}
}