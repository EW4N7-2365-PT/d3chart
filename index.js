import 'babel-polyfill';
import * as d3 from 'd3';
import {SingleLineChart} from './chart/index';

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
	{x: '10:36:00', y: 15},
	{x: '10:37:00', y: 16},
	{x: '10:38:00', y: 17},
	{x: '10:39:00', y: 18},
	{x: '10:40:00', y: 22},
	{x: '10:41:00', y: 20},
	{x: '10:42:00', y: 22},
	{x: '10:43:00', y: 23},
	{x: '10:44:00', y: 24},
	{x: '10:45:00', y: 25},
	{x: '10:46:00', y: 26},
	{x: '10:47:00', y: 27},
	{x: '10:48:00', y: 28},
	{x: '10:49:00', y: 30},
	{x: '10:50:00', y: 31},
	{x: '10:51:00', y: 32},
	{x: '10:52:00', y: 33},
	{x: '10:53:00', y: 30},
	{x: '10:54:00', y: 31},
	{x: '10:55:00', y: 32},
	{x: '10:56:00', y: 33},
	{x: '10:57:00', y: 33},
	{x: '10:58:00', y: 34},
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
	transitionDuration: 350,
	curve: d3.curveLinear,
	scaleXClass: d3.scaleTime,
	displayTimeFormat: '%H:%M:%S'
};

const chart = new SingleLineChart('#root', config_object)
	.initChart()
	.provideData(data)
	.drawChart();


chart.effects.addFromConfig({
	'area': {fillColor: 'orange', opacity: .2},
	'datapoints': {r: 4, fillColor: 'grey'},
	'gridlines': {}
});

chart.effects.apply('gridlines');
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
size3.addEventListener('click', () => chart.resize(1850, 950));
