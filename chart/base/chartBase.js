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
	 * @param config.scaleXClass - scale class for bottom axis
	 * @param config.scaleYClass - scale class for left or right axis
	 * @param {number} config.transitionDuration - resize animation time
	 */
	constructor(mount, {
		width, height, margin,
		invertYAxis, scaleXClass, scaleYClass,
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
		this.timeFormat = d3.timeFormat('%H:%M');
		this.invertYAxis = invertYAxis || false;
		this.transitionDuration = transitionDuration || 0;
		this.scaleXClass = scaleXClass || d3.scaleLinear;
		this.scaleYClass = scaleYClass || d3.scaleLinear;
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
		return this.scaleXClass()
			.domain([d3.min(this.data, d => d.x), d3.max(this.data, d => d.x)])
			.range([this.margin, this.width]);
	}

	get scaleY() {
		let domain = [d3.max(this.data, d => d.y), d3.min(this.data, d => d.y)];
		domain = this.invertYAxis ? domain.reverse() : domain;

		return this.scaleYClass()
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
		return this;
	}

	drawXAxis() {
		this.axisBottom = d3
			.axisBottom(this.scaleX)
			.tickFormat(this.timeFormat);
		this.container.append('g')
			.classed('axis x-axis', true)
			.attr('transform', `translate(0,${this.height})`)
			.call(this.axisBottom);
	}

	drawYAxis() {
		this.axisLeft = d3.axisLeft(this.scaleY);
		this.container.append('g')
			.classed('axis y-axis', true)
			.attr('transform', `translate(${this.margin},0)`)
			.call(this.axisLeft);
	}

	/**
	 *
	 * @param {number} width - new container width
	 * @param {number} height - new container height
	 */
	resizeContainer(width, height) {
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

		this.effects.hideAll();
		this.resizeContainer(width, height);
		this.axisLeft.scale(this.scaleY);
		this.axisBottom.scale(this.scaleX);

		this.container.selectAll('.y-axis')
			.transition()
			.duration(this.transitionDuration)
			.call(this.axisLeft);

		this.container.selectAll('.x-axis')
			.transition()
			.duration(this.transitionDuration)
			.call(this.axisBottom);

		return await waitfor(this.transitionDuration);
	}

	/**
	 * Draw axes
	 * @returns {ChartBase}
	 */
	drawChart() {
		this.drawXAxis();
		this.drawYAxis();
		return this;
	}
}
