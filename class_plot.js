import * as d3 from 'd3';

export class ChartBase {
    constructor(mount, {width, height, margin, curve}) {
        this.container = null;
        this._data = null;
        this.axisBottom = null;
        this.axisLeft = null;
        this.curve = curve || d3.curveCardinal;
        this.mount = mount;
        this.width = width;
        this.height = height;
        this.margin = margin;
    }

    defineScales([x, y]) {
        return this;
    }

    provideData(data) {
        this._data = data;
        return this;
    }

    get data() {
        return this._data
    }


    get scaleX() {
        return d3.scaleLinear()
            .domain([d3.min(this.data, d => d.x), d3.max(this.data, d => d.x)])
            .range([0, this.height - this.margin * 2])
    }

    get scaleY() {
        return d3.scaleLinear()
            .domain([d3.max(this.data, d => d.y), d3.min(this.data, d => d.y)])
            .range([0, this.width - this.margin * 2])
    }


    initChart() {
        const mount = d3.select(this.mount);
        if (mount.empty()) {
            throw new Error('mount does not exists')
        }
        if(!this._data) {
            throw new Error('Provide data first')
        }
        if (!mount.select('svg').empty()) {
            /* update svg container attributes */
            this.container
                .attr('height', this.height)
                .attr('width', this.width);
            return true;
        }
        this.container = mount.append("svg")
            .attr('height', this.height)
            .attr('width', this.width);

        return true;
    }

    drawXAxis() {
        this.axisBottom = d3.axisBottom(this.scaleX);
        this.container.append('g')
            .classed('x-axis', true)
            .attr('transform', `translate(${this.margin},${this.height - this.margin})`)
            .call(this.axisBottom);
    }

    drawYAxis() {
        this.axisLeft = d3.axisLeft(this.scaleY);
        this.container.append('g')
            .classed('y-axis', true)
            .attr('transform', `translate(${this.margin},${this.margin})`)
            .call(this.axisLeft);
    }

    drawLine() {
        const line = d3.line()
            .x(d => this.scaleX(d.x))
            .y(d => this.scaleY(d.y))
            .curve(this.curve);
        this.container
            .append('path')
            .attr('d', line(this.data))
            .attr('fill', 'none')
            .attr('stroke', 'blue')
            .attr('stroke-width', '2px')
            .attr('transform', `translate(${this.margin},${this.margin})`)
    }

    drawChart() {
        this.initChart();
        this.drawXAxis();
        this.drawYAxis();
        this.drawLine();
    }
}

export class GridlinesChart extends ChartBase {

    makeGridlines(scale, axis) {
        return axis(scale)
            .tickFormat("")
            .tickSize(-this.width - this.margin * 2);
    }

    drawYGridlines() {
        this.container
            .append('g')
            .classed('grid grid-y', true)
            .attr('transform', `translate(${this.margin},${this.margin})`)
            .call(this.makeGridlines(this.scaleY, d3.axisLeft))
    }

    drawXGridlines() {
        this.container
            .append('g')
            .classed('grid grid-x', true)
            .attr('transform', `translate(${this.margin},${this.height - this.margin})`)
            .call(this.makeGridlines(this.scaleX, d3.axisBottom))
    }

    initChart(...args) {
        const success = super.initChart(...args);
        if (success) {
            this.drawYGridlines();
            this.drawXGridlines();
        }
    }
}