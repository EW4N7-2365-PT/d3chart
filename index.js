import 'babel-polyfill';
import * as d3 from 'd3';
import {ChartGridlines} from './chart/index';
import {DataPointEffect} from './chart/index';
import {MouseTrackingEffect} from './chart/index';

const data2 = [
	{x: '10:6:24', y: 2},
	{x: '10:7:25', y: 20},
	{x: '10:8:26', y: 6},
	{x: '10:9:27', y: 4},
	{x: '10:10:29', y: 10},
	{x: '10:11:29', y: 5},
	{x: '10:12:29', y: 8},
	{x: '10:13:29', y: 2},
	{x: '10:14:29', y: 9},
	{x: '10:15:29', y: 12},
	{x: '10:16:29', y: 13},
	{x: '10:17:29', y: 15},
	{x: '10:19:29', y: 17},
	{x: '10:20:29', y: 15},
	{x: '10:21:29', y: 14},
	{x: '10:22:29', y: 13},
	{x: '10:23:29', y: 12},
	{x: '10:24:29', y: 11},
];

const parse = d3.timeParse('%H:%M:%S');
data2.forEach(e => {
	e.x = parse(e.x);
});
const config_object = {
	height: 900,
	width: 1300,
	margin: 10,
	invertYAxis: false,
	transitionDuration: 2500,
	curve: d3.curveLinear,
	scaleXClass: d3.scaleTime
};

const chart = new ChartGridlines('#root', config_object)
	.initChart()
	.provideData(data2)
	.drawChart();

// chart.effects.add('area', new AreaEffect({fillColor: 'orange', opacity: .3}), true);
chart.effects.add('datapoints', new DataPointEffect({r: 7, fillColor: 'grey'}));
chart.effects.add('mousetracking', new MouseTrackingEffect());

const select = document.getElementById('select');
select.addEventListener('change', (event) => {
	const index = event.currentTarget.selectedIndex;
	let [width, height] = event.currentTarget.options[index].value.split('x');
	chart.resize(width, height);
});

const effects = document.getElementById('effects');
const effects2 = document.getElementById('effects2');

// console.log(chart.effects.list(true));

effects.addEventListener('click', () => {
	chart.effects.showAll();
	setTimeout(() => {
		// console.log(chart.effects.list(true));
	}, 2000);
});

effects2.addEventListener('click', () => {
	chart.effects.hideAll();
});