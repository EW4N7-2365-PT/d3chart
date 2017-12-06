import * as d3 from 'd3';
import {ChartBase} from '../base/chartBase';

/**
 * Draw basic line
 * @extends {ChartBase}
 */
export class SingleLineChart extends ChartBase {
	constructor(mount, config_obj) {
		super(mount, config_obj);
		let {curve} = config_obj;
		this.curve = curve || d3.curveLinear;
	}

	provideData(data) {
		if (data[0].x === undefined || data[0].y === undefined) {
			throw new Error('Call normalizeData first');
		}
		this._data = data;
		return this;
	}

	_createLine() {
		return d3.line()
			.x(d => this.scaleX(d.x))
			.y(d => this.scaleY(d.y))
			.curve(this.curve);
	}

	update(data) {
		this._data = data;
		this.drawChart();
	}

	drawLine() {
		d3.selectAll('.line').remove();
		const line = this._createLine();
		this.container
			.append('path')
			.classed('line', true)
			.attr('d', line(this.data))
			.attr('fill', 'none');
	}

	/**
	 *
	 * @returns {SingleLineChart}
	 */
	drawChart() {
		super.drawChart();
		this.drawLine();
		return this;
	}

	/*
	New line needs to be re-calculated
	 */
	async resize(width, height) {
		this.container.selectAll('.line').remove();
		await super.resize(width, height);
		this.drawLine();
		return Promise.resolve(true);
	}
}
