import * as d3 from 'd3';
import {SingleLineChart} from './singleLineChart';

/**
 *
 * @extends {SingleLineChart}
 */
export class ChartGridlines extends SingleLineChart {

	makeXGridlines(scale) {
		return d3.axisBottom(scale)
			.tickFormat('')
			.tickSize(-(this.height - this.margin));
	}

	makeYGridlines(scale) {
		return d3.axisLeft(scale)
			.tickFormat('')
			.tickSize(-(this.width - this.margin));
	}

	drawYGridlines() {
		d3.select('.layer-0')
			.append('g')
			.classed('grid y-grid', true)
			.attr('transform', `translate(${this.margin},0)`)
			.call(this.makeYGridlines(this.scaleY));
	}

	drawXGridlines() {
		d3.select('.layer-0')
			.append('g')
			.classed('grid y-grid', true)
			.attr('transform', `translate(0,${this.height})`)
			.call(this.makeXGridlines(this.scaleX));
	}

	async resize(width, height) {
		this.container.selectAll('.grid').remove();
		await super.resize(width, height);
		this.drawXGridlines();
		this.drawYGridlines();
		this.effects.applyOnResize();
	}

	drawChart() {
		this.drawXGridlines();
		this.drawYGridlines();
		return super.drawChart();
	}
}
