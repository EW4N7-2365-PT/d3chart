import * as d3 from 'd3';
import {EffectBase} from './effectBase';

export class MouseTrackingEffect extends EffectBase {

	apply(chart) {

		this.addElements(chart);
		const scaleX = chart.scaleX;
		const scaleY = chart.scaleY;
		d3.selectAll('.layer-3')
			.append('rect')
			.attr('height', chart.height)
			.attr('width', chart.width)
			.classed('intercept', true)
			.attr('fill', 'none')
			.attr('stroke', 'none')
			.attr('pointer-events', 'all')
			.on('mousemove', function () {
				const indexX = scaleX.invert(d3.mouse(this)[0]);

				const object_bisector = d3.bisector(data => data.x).left;
				const bisect = object_bisector(chart.data, indexX);
				const data_closer = chart.data[bisect - 1];
				const data_far = chart.data[bisect];
				if (!data_closer || !data_far) {
					return;
				}
				const data = indexX - data_far.x > data_closer.x - indexX ? data_far : data_closer;
				const x = scaleX(data.x);
				const y = scaleY(data.y);
				const x_label_width = d3.select('.mouse-tracking-label-x').node().getBBox().width;
				const y_label_width = d3.select('.mouse-tracking-label-y').node().getBBox().width;
				d3.select('.x-track')
					.transition()
					.duration(60)
					.attr('x1', x)
					.attr('y1', chart.margin)
					.attr('x2', x)
					.attr('y2', chart.height);

				d3.select('.y-track')
					.transition()
					.duration(60)
					.attr('x1', chart.margin)
					.attr('y1', y)
					.attr('x2', chart.width)
					.attr('y2', y);

				d3.select('.mouse-tracking-rect-x')
					.transition()
					.duration(60)
					.attr('opacity', 1)
					.attr('x', x - (x_label_width / 2))
					.attr('width', x_label_width + 7)
					.attr('y', chart.height);

				d3.select('.mouse-tracking-label-x')
					.transition()
					.duration(60)
					.text(chart.displayTimeFormat(data.x))
					.attr('fill', 'white')
					.attr('x', x - ((x_label_width - 5) / 2))
					.attr('y', chart.height + 15);

				d3.select('.mouse-tracking-rect-y')
					.transition()
					.duration(60)
					.attr('opacity', 1)
					.attr('width', y_label_width + 5)
					.attr('x', chart.margin - y_label_width - 5)
					.attr('y', y - 35 / 2);

				d3.select('.mouse-tracking-label-y')
					.transition()
					.duration(60)
					.attr('x', chart.margin - y_label_width - 3)
					.attr('y', y + (y_label_width / 2))
					.text(data.y)
					.attr('fill', 'white');
			});
	}

	addElements(chart) {

		chart.container.insert('line', '.line')
			.classed('x-track', true)
			.attr('stroke', 'grey')
			.attr('stroke-width', 3)
			.attr('opacity', 0.5);

		chart.container.insert('line', '.line')
			.classed('y-track', true)
			.attr('stroke', 'grey')
			.attr('stroke-width', 3)
			.attr('opacity', 0.5);
		chart.container
			.append('rect')
			.attr('height', 22)
			.attr('fill', '#353638')
			.attr('opacity', 0)
			.classed('mouse-tracking-rect-x', true);

		chart.container
			.append('text')
			.attr('font-size', '10pt')
			.classed('mouse-tracking-label-x', true);

		chart.container
			.append('rect')
			.attr('height', 35)
			.attr('width', 20)
			.attr('fill', '#353638')
			.attr('opacity', 0)
			.classed('mouse-tracking-rect-y', true);

		chart.container
			.append('text')
			.classed('mouse-tracking-label-y', true)
			.attr('font-size', '10pt');


	}

	remove() {
		d3.selectAll('.intercept').remove();
		d3.selectAll('.y-track').remove();
		d3.selectAll('.x-track').remove();
		d3.selectAll('.mouse-tracking-label-y').remove();
		d3.selectAll('.mouse-tracking-label-x').remove();
		d3.selectAll('.mouse-tracking-rect-x').remove();
		d3.selectAll('.mouse-tracking-rect-y').remove();
	}

	update() {

	}

	serialize() {
		return {};
	}
}
