import * as d3 from 'd3';
import {EffectBase} from './effectBase';

export class GridlinesEffect extends EffectBase {

	apply(chart) {

		const gridlinesY = d3.axisLeft(chart.scaleY)
			.tickFormat('')
			.tickSize(-(chart.width - chart.margin));

		const gridlinesX = d3.axisBottom(chart.scaleX)
			.tickFormat('')
			.tickSize(-(chart.height - chart.margin));

		d3.select('.layer-0')
			.append('g')
			.classed('grid y-grid', true)
			.attr('opacity', 0)
			.attr('transform', `translate(${chart.margin},0)`)
			.call(gridlinesY);

		d3.select('.layer-0')
			.append('g')
			.attr('opacity', 0)
			.classed('grid y-grid', true)
			.attr('transform', `translate(0,${chart.height})`)
			.call(gridlinesX);
		d3.selectAll('.grid')
			.transition()
			.duration(350)
			.attr('opacity', 1)
	}

	remove() {
		d3.selectAll('.grid').remove();
	}

	update() {

	}

	serialize() {
		return {};
	}

}
