import 'babel-polyfill';
import * as d3 from 'd3';
import {ChartGridlines} from './chart/index';
import {DataPointEffect} from './chart/index';
import {MouseTrackingEffect} from './chart/index';
import {AreaEffect} from './chart/index';


const data = [
	{x: '10:6:24', y: 2},
	{x: '10:7:25', y: 18},
	{x: '10:8:26', y: 6},
	{x: '10:9:27', y: 4},
	{x: '10:10:29', y: 10},
	{x: '10:11:00', y: 5},
	{x: '10:12:00', y: 8},
	{x: '10:13:00', y: 5},
	{x: '10:14:29', y: 9},
	{x: '10:15:29', y: 12},
	{x: '10:16:29', y: 13},
	{x: '10:17:29', y: 15},
	{x: '10:19:29', y: 17},
	{x: '10:20:29', y: 15},
	{x: '10:21:29', y: 14},
	{x: '10:22:29', y: 13},
	{x: '10:23:29', y: 12},
	{x: '10:25:29', y: 13},
	{x: '10:26:00', y: 14},
	{x: '10:27:29', y: 17},
	{x: '10:28:29', y: 14},
	{x: '10:29:29', y: 15},
	{x: '10:30:29', y: 13},
	{x: '10:31:29', y: 17},
	{x: '10:32:29', y: 17},
	{x: '10:33:29', y: 19},
	{x: '10:34:29', y: 12},
	{x: '10:35:29', y: 10},
	{x: '10:36:29', y: 15},
];

const parse = d3.timeParse('%H:%M:%S');
data.forEach(e => {
	e.x = parse(e.x);
});
const config_object = {
	height: 900,
	width: 1300,
	margin: 25,
	invertYAxis: false,
	transitionDuration: 1300,
	curve: d3.curveLinear,
	scaleXClass: d3.scaleTime
};

const chart = new ChartGridlines('#root', config_object)
	.initChart()
	.provideData(data)
	.drawChart();

chart.effects.add('area', new AreaEffect({fillColor: 'orange', opacity: .2}));
chart.effects.add('datapoints', new DataPointEffect({r: 8, fillColor: 'grey'}));
chart.effects.add('mousetracking', new MouseTrackingEffect());


const effect1 = document.getElementById('effect1');
const effect2 = document.getElementById('effect2');
const effect3 = document.getElementById('effect3');
const size1 = document.getElementById('size1');
const size2 = document.getElementById('size2');
const size3 = document.getElementById('size3');


effect1.addEventListener('click', () => chart.effects.toggle('area'));
effect2.addEventListener('click', () => chart.effects.toggle('mousetracking'));
effect3.addEventListener('click', () => chart.effects.toggle('datapoints'));
size1.addEventListener('click', () => chart.resize(1300, 900));
size2.addEventListener('click', () => chart.resize(1600, 800));
size3.addEventListener('click', () => chart.resize(700, 500));