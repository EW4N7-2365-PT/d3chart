import * as d3 from 'd3';
import {waitfor} from '../utils';
import {EffectsRegistry} from './effectsRegistry';

export class ChartBase {
	/**
	 * @param {string} mount - root mounting DOM element for SVG container
	 * @param {Object} config - Initial settings
	 * @param {number} config.width - width of svg container
	 * @param {number} config.height - height of svg container
	 * @param {number} config.margin - left and right margin
	 * @param {boolean} config.invertYAxis - if true Y axis will start with the smallest unit at the top
	 * @param {number} config.transitionDuration - resize animation time
	 */
	constructor(mount, {
		width, height, margin,
		invertYAxis,
		timeFormat,
		transitionDuration
	}) {
		this.mount = mount;
		this._width = width;
		this._height = height;
		this._margin = margin;
		this._data = null;
		this.container = null;
		this.axisBottom = null;
		this.axisLeft = null;
		this.displayTimeFormat = timeFormat || d3.timeFormat('%H:%M:%S');
		this.invertYAxis = invertYAxis || false;
		this.transitionDuration = transitionDuration || 0;
		this.effects = new EffectsRegistry(this);
	}

	/* Define width/height/margin getters/setters to
	avoid adjusting position of an element[s] by hand as much as possible  */
	get margin() {
		return this._margin * 2;
	}

	/**
	 *
	 * @returns {number} - adjusted chart width by margin
	 */
	get width() {
		return (this._width - this.margin);
	}

	/**
	 *
	 * @param {number} value
	 */
	set width(value) {
		this._width = value;
	}

	/**
	 *
	 * @returns {number} - adjusted chart height by margin
	 */
	get height() {
		return (this._height - this.margin);
	}

	/**
	 *
	 * @param {number} value
	 */
	set height(value) {
		this._height = value;
	}

	get data() {
		return this._data;
	}

	get scaleX() {
		return d3.scaleTime()
			.domain([d3.min(this.data, d => d.x), d3.max(this.data, d => d.x)])
			.range([this.margin, this.width]);
	}

	get scaleY() {
		let domain = [d3.max(this.data, d => d.y), d3.min(this.data, d => d.y)];
		domain = this.invertYAxis ? domain.reverse() : domain;

		return d3.scaleLinear()
			.domain(domain)
			.range([this.margin, this.height]);
	}

	/**
	 * @returns {ChartBase}
	 */
	initChart() {

		const mount = d3.select(this.mount);
		if (mount.empty()) {
			throw new Error('mount does not exist');
		}
		this.container = mount.append('svg')
			.attr('height', this.height + this.margin)
			.attr('width', this.width + this.margin);

		this.container.append('g').classed('layer-0', true);
		this.container.append('g').classed('layer-1', true);
		this.container.append('g').classed('layer-2', true);
		return this;
	}

	_drawXAxis() {
		d3.selectAll('.x-axis').remove();
		this.axisBottom = d3
			.axisBottom(this.scaleX)
			.tickFormat(this.displayTimeFormat);
		d3.select('.layer-2')
			.append('g')
			.classed('axis x-axis', true)
			.attr('transform', `translate(0,${this.height})`)
			.call(this.axisBottom);
	}

	_drawYAxis() {
		d3.selectAll('.y-axis').remove();
		this.axisLeft = d3.axisLeft(this.scaleY);
		d3.select('.layer-2')
			.append('g')
			.classed('axis y-axis', true)
			.attr('transform', `translate(${this.margin},0)`)
			.call(this.axisLeft);
	}

	/**
	 *
	 * @param {number} width - new container width
	 * @param {number} height - new container height
	 */
	_resizeContainer(width, height) {
		this.width = width;
		this.height = height;
		this.container
			.transition()
			.duration(this.transitionDuration)
			.attr('width', width)
			.attr('height', height);
	}

	/**
	 * re-calculate scales for x,y axes
	 * if transitionDuration is greater than 0 then wait for x milliseconds
	 * @returns {Promise}
	 */
	async resize(width, height) {

		this.effects.hideOnResize();
		this._resizeContainer(width, height);
		this.axisLeft.scale(this.scaleY);
		this.axisBottom.scale(this.scaleX);

		this.container.selectAll('.y-axis')
			.transition()
			.duration(this.transitionDuration)
			.call(this.axisLeft);

		this.container.selectAll('.x-axis')
			.transition()
			.duration(this.transitionDuration)
			.attr('transform', `translate(0,${this.height})`)
			.call(this.axisBottom);

		return await waitfor(this.transitionDuration);
	}

	/**
	 * Draw axes
	 * @returns {ChartBase}
	 */
	drawChart() {
		this._drawXAxis();
		this._drawYAxis();
		return this;
	}
}

